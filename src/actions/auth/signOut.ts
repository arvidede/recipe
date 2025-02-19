"use server"

import getServerClient from "@/db/server"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export default async function signOut() {
    const client = await getServerClient()
    await client.auth.signOut()

    revalidatePath("/")

    return NextResponse.redirect("/")
}
