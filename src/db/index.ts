import { ENV } from "@/utils/env"
import { getLogger } from "@/utils/log"
import fs from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import getClient from "./client"

const __dirname = dirname(fileURLToPath(import.meta.url))
const REQUEST_CACHE_FILE = "requests.json"
const REQUEST_CACHE_FILE_PATH = join(__dirname, "cache", REQUEST_CACHE_FILE)

const logger = getLogger("db")

interface DB {
    get(key: string): string | undefined
    set(key: string, payload: string): void
    has(key: string): boolean
}

class ProdDB implements DB {
    db!: Map<string, string>
    client!: ReturnType<typeof getClient>

    constructor() {
        this.init()
    }

    private executeQuery<T>(query: T) {
        ;(async function () {
            await query
        })()
    }

    private async init(retries = 3): Promise<void> {
        logger.info("Initialising DB...")

        this.client = getClient()

        const { data, error } = await this.client.from("recipes").select("*")

        if (error) {
            if (retries > 0) {
                return this.init(retries - 1)
            }

            logger.error(
                "Failed to initialise db from supabase",
                JSON.stringify(error, null, 2),
            )
            this.db = new Map<string, string>()
            return
        }

        this.db = new Map(data.map(({ key, value }) => [key, value]))
        logger.info("DB initialised.")
    }

    public set(key: string, payload: string) {
        logger.info("SET", key)

        if (!this.db) {
            logger.error("SET", "DB not initialised")
            return
        }

        this.db.set(key, payload)

        const query = getClient()
            .from("recipes")
            .upsert({ key, value: payload })

        this.executeQuery(query)
    }

    public get(key: string) {
        logger.info("GET", key)
        return this.db.get(key)
    }

    public has(key: string) {
        if (!this.db) {
            logger.error("HAS", "DB not initialised")
            return false
        }

        const has = this.db.has(key)

        logger.info("HAS", key, has)

        return has
    }
}

class DevDB implements DB {
    db!: Map<string, string>

    constructor() {
        this.init()
    }

    private init() {
        logger.info("LOAD")

        this.db = new Map<string, string>(
            Object.entries(
                JSON.parse(fs.readFileSync(REQUEST_CACHE_FILE_PATH, "utf-8")),
            ),
        )
        this.listen()
    }

    public set(key: string, payload: string) {
        if (!this.db) {
            logger.error("SET", "DB not initialised")
            return
        }

        logger.info("SET", key)
        this.db.set(key, payload)
        this.persist()
    }

    public get(key: string) {
        logger.info("GET", key)
        return this.db.get(key)
    }

    public has(key: string) {
        logger.info("HAS", key)
        return this.db.has(key)
    }

    private persist() {
        fs.writeFileSync(
            REQUEST_CACHE_FILE_PATH,
            JSON.stringify(Object.fromEntries(this.db)),
            "utf-8",
        )
    }

    private listen() {
        fs.watchFile(REQUEST_CACHE_FILE_PATH, () => {
            logger.info(`DETECTED FILE CHANGE ${REQUEST_CACHE_FILE_PATH}`)
            this.init()
        })
    }
}

export default ENV.IS_DEV ? DevDB : ProdDB
