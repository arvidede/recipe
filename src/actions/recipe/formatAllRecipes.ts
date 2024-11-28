"use server"
import getServerClient from "@/db/server"

export default async function formatAllRecipes() {
    const { data } = await getServerClient().from("recipes").select("*")
    if (data) {
        data.forEach(async (it) => {
            console.log(
                await getServerClient()
                    .from("recipes")
                    // @ts-ignore
                    .update({ ...it, ...it.value })
                    .eq("id", it.id),
            )
        })
    }
}
