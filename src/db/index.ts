import { getLogger } from "@/utils/log"
import fs from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const REQUEST_CACHE_FILE = "requests.json"
const REQUEST_CACHE_FILE_PATH = join(__dirname, "cache", REQUEST_CACHE_FILE)

const IS_DEV = process.env.NODE_ENV === "development"

const logger = getLogger("db")

export default class DB {
    db!: Map<string, string>
    constructor() {
        this.init()
    }

    private init() {
        if (IS_DEV) {
            this.initDBFromFile()
            this.listen()
        } else {
            this.initDB()
        }
    }

    public set(key: string, payload: string) {
        if (!this.db) {
            logger.error("SET", "DB not initialised")
            return
        }

        logger.info("SET", key)
        this.db.set(key, payload)

        if (IS_DEV) {
            this.cache()
        }
    }

    private initDBFromFile() {
        logger.info("LOAD")

        this.db = new Map<string, string>(
            Object.entries(
                JSON.parse(fs.readFileSync(REQUEST_CACHE_FILE_PATH, "utf-8"))
            )
        )
    }

    private initDB() {
        this.db = new Map<string, string>()
    }

    public get(key: string) {
        logger.info("GET", key)
        return this.db.get(key)
    }

    public has(key: string) {
        logger.info("HAS", key)
        return this.db.has(key)
    }

    private cache() {
        fs.writeFileSync(
            REQUEST_CACHE_FILE_PATH,
            JSON.stringify(Object.fromEntries(this.db)),
            "utf-8"
        )
    }

    private listen() {
        fs.watchFile(REQUEST_CACHE_FILE_PATH, () => {
            logger.info(`DETECTED FILE CHANGE ${REQUEST_CACHE_FILE_PATH}`)
            this.initDBFromFile()
        })
    }
}
