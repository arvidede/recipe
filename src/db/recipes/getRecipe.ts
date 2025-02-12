import getServerClient from "../server"

export default async function getRecipe(id: string) {
    const { data } = await getServerClient()
        .from("recipes")
        .select("*")
        .eq("id", id)
        .returns<UserRecipe[]>()
        .single()

    if (!data) {
        return null
    }

    return data
}
