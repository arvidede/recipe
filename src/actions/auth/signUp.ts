"use server"

import getServerClient from "@/db/server"
import { redirect } from "next/navigation"

export default async function signUp(formData: FormData) {
    const email = String(formData.get("email"))
    const password = String(formData.get("password"))
    const name = String(formData.get("name"))

    const supabase = getServerClient()

    await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
            data: {
                name,
            },
        },
    })

    return redirect("/")
}
