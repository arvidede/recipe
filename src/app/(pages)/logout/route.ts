"use server"

import getServerClient from "@/db/server"
import { redirect } from "next/navigation"

export async function GET() {
    const client = await getServerClient()
    await client.auth.signOut()

    return redirect("/")
}
