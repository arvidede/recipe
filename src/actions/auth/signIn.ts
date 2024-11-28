"use server"

import getServerClient from "@/db/server"
import { redirect } from "next/navigation"

export default async function signIn(formData: FormData) {
    const email = String(formData.get("email"))
    const password = String(formData.get("password"))

    const supabase = getServerClient()

    await supabase.auth.signInWithPassword({
        email,
        password,
    })

    return redirect("/")
}
