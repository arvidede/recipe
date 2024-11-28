import { ENV } from "@/utils/env"
import { getLogger } from "@/utils/log"
import fs from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import getAllQueries from "./actions/getAllQueries"
import setQuery from "./actions/setQuery"
import getClient from "./admin"

const __dirname = dirname(fileURLToPath(import.meta.url))
const REQUEST_CACHE_FILE = "cache.json"
const REQUEST_CACHE_FILE_PATH = join(__dirname, REQUEST_CACHE_FILE)

const logger = getLogger("db")

interface DB {
    get(key: string): Recipe | null
    set(key: string, payload: Recipe): void
    has(key: string): boolean
}

class ProdDB implements DB {
    db!: Map<string, Recipe>
    client!: ReturnType<typeof getClient>

    constructor() {
        this.init()
    }

    private async init(retries = 3): Promise<void> {
        logger.info("Initialising DB...")

        this.client = getClient()

        const { data, error } = await getAllQueries()

        if (error) {
            if (retries > 0) {
                return this.init(retries - 1)
            }

            logger.error(
                "Failed to initialise db from supabase",
                JSON.stringify(error, null, 2),
            )
            this.db = new Map()
            return
        }

        this.db = new Map(data.map(({ key, value }) => [key, value]))
        logger.info("DB initialised.")
    }

    public set(key: string, payload: Recipe) {
        logger.info("SET", key)

        if (!this.db) {
            logger.error("SET", "DB not initialised")
            return
        }

        this.db.set(key, payload)
        setQuery({ key, value: payload })
    }

    public get(key: string) {
        logger.info("GET", key)
        return this.db.get(key) ?? null
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
    db!: Map<string, Recipe>

    constructor() {
        this.init()
    }

    private init() {
        logger.info("LOAD")

        this.db = new Map<string, Recipe>(
            Object.entries(
                JSON.parse(fs.readFileSync(REQUEST_CACHE_FILE_PATH, "utf-8")),
            ),
        )
    }

    public set(key: string, payload: Recipe) {
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
        return this.db.get(key) ?? null
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
}

let db: DB

function getDB() {
    if (!db) {
        db = new (ENV.IS_DEV ? DevDB : ProdDB)()
    }
    return db
}

export default getDB
