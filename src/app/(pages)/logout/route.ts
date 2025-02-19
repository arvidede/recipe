"use server"

import getServerClient from "@/db/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function GET() {
    const client = await getServerClient()
    await client.auth.signOut()

    revalidatePath("/", "layout")
    return redirect("/")
}
