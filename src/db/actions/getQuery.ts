import { stripTrailingSlash } from "@/utils/stripTrailingSlash"
import getServerClient from "../server"

export default async function getQuery(key?: string) {
    if (!key) {
        return null
    }

    const { data } = await getServerClient()
        .from("queries")
        .select("*")
        .eq("key", stripTrailingSlash(key))
        .returns<Query[]>()
        .single()

    if (!data) {
        return null
    }

    return data.value
}
