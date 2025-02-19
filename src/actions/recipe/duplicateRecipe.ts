"use server"

import protect from "@/app/auth/protect"
import getServerClient from "@/db/server"
import { revalidatePath } from "next/cache"

export default async function duplicateRecipe(recipe: UserRecipe) {
    await protect()

    const client = await getServerClient()

    const { id: _, ...recipeWithoutId } = recipe
    const { error } = await client.from("recipes").insert(recipeWithoutId)

    if (!error) {
        revalidatePath("/recipes")
    }

    return !error
}
