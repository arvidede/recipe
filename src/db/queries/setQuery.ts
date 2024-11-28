import getAdminClient from "../admin"

export default async function setQuery(query: Query) {
    await getAdminClient().from("queries").upsert(query)
}
