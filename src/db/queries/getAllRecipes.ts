import getServerClient from "../server"

export default async function getAllRecipes() {
    return getServerClient().from("recipes").select("*").returns<UserRecipe[]>()
}
