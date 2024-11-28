"use server"

import getServerClient from "@/db/server"

export default async function saveRecipe(recipe: Recipe) {
    const { error } = await getServerClient().from("recipes").upsert(recipe)
    return !error
}
