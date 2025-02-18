"use server"

import protect from "@/app/auth/protect"
import getServerClient from "@/db/server"

export default async function duplicateRecipe(recipe: UserRecipe) {
    await protect()

    const client = await getServerClient()

    const { id: _, ...recipeWithoutId } = recipe
    const { error } = await client.from("recipes").insert(recipeWithoutId)

    return !error
}
