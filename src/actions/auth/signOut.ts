"use server"

import getServerClient from "@/db/server"

export default async function signOut() {
    const client = await getServerClient()
    await client.auth.signOut()

    // return redirect("/login")
}
