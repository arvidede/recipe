import getServerClient from "@/db/server"
import { type EmailOtpType } from "@supabase/supabase-js"
import { redirect } from "next/navigation"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get("token_hash")
    const type = searchParams.get("type") as EmailOtpType | null
    const next = searchParams.get("next") ?? "/"

    if (token_hash && type) {
        const supabase = getServerClient()

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        })

        if (!error) {
            redirect(next)
        }
    }

    redirect("/error")
}