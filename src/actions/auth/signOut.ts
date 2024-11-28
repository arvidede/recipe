"use server"

import getServerClient from "@/db/server"

export default async function signOut() {
    await getServerClient().auth.signOut()

    // return redirect("/login")
}
