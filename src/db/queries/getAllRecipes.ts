import getServerClient from "../server"

export default async function getAllRecipes() {
    const client = await getServerClient()
    return client.from("recipes").select("*").returns<UserRecipe[]>()
}
