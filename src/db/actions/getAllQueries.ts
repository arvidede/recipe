import getAdminClient from "../admin"

export default async function getAllQueries() {
    return getAdminClient().from("queries").select("*").returns<Query[]>()
}
