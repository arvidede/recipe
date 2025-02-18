"use server"

import protect from "@/app/auth/protect"
import getServerClient from "@/db/server"

export default async function duplicateRecipe(recipe: UserRecipe) {
    await protect()

    const { id: _, ...recipeWithoutId } = recipe
    const { error } = await getServerClient()
        .from("recipes")
        .insert(recipeWithoutId)

    return !error
}
