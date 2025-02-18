"use server"

import protect from "@/app/auth/protect"
import getServerClient from "@/db/server"

export default async function deleteRecipe(recipe: UserRecipe) {
    await protect()

    const client = await getServerClient()

    const { error } = await client.from("recipes").delete().eq("id", recipe.id)

    return !error
}
