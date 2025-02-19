import { Database } from "@/types/db"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export default async function getServerClient() {
    const cookieStore = await cookies()

    return createServerClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options),
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        },
    )
}

type ServerClient = Awaited<ReturnType<typeof getServerClient>>

export async function getSession(client?: ServerClient) {
    const supabase = client || (await getServerClient())
    const {
        data: { session },
    } = await supabase.auth.getSession()
    return session
}

export async function getUser(client?: ServerClient) {
    const supabase = client || (await getServerClient())
    const {
        data: { user },
    } = await supabase.auth.getUser()
    return user
}
