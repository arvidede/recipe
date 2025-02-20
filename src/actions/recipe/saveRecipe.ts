"use server"

import protect from "@/app/auth/protect"
import getServerClient from "@/db/server"
import { revalidatePath } from "next/cache"

export default async function saveRecipe(recipe: Recipe) {
    await protect()

    const client = await getServerClient()
    const { error } = await client.from("recipes").upsert(recipe)

    revalidatePath("/recipe/[id]", "page")

    return !error
}
