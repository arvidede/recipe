import fs from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const REQUEST_CACHE_FILE = "requests.json"
const REQUEST_CACHE_FILE_PATH = join(__dirname, "cache", REQUEST_CACHE_FILE)

export default class DB {
    db!: Map<string, string>
    constructor() {
        this.load()
        this.listen()
    }

    public set(key: string, payload: string) {
        if (!this.db) {
            this.load()
        }
        this.db.set(key, payload)
        fs.writeFileSync(
            REQUEST_CACHE_FILE_PATH,
            JSON.stringify(Object.fromEntries(this.db)),
            "utf-8"
        )
    }

    private load() {
        this.db = new Map<string, string>(
            Object.entries(
                JSON.parse(fs.readFileSync(REQUEST_CACHE_FILE_PATH, "utf-8"))
            )
        )
    }

    public get(key: string) {
        return this.db.get(key)
    }

    public has(key: string) {
        return this.db.has(key)
    }

    private listen() {
        fs.watchFile(REQUEST_CACHE_FILE_PATH, this.load)
    }
}
