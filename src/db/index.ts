import getBrowserClient from "./client"
import getServerClient from "./server"

function getDB() {
    if (typeof window === "undefined") {
        return getServerClient()
    }
    return getBrowserClient()
}

export default getDB
