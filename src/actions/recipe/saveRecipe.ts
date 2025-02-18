"use server"

import protect from "@/app/auth/protect"
import getServerClient from "@/db/server"

export default async function saveRecipe(recipe: Recipe) {
    await protect()

    const client = await getServerClient()
    const { error } = await client.from("recipes").upsert(recipe)
    return !error
}
