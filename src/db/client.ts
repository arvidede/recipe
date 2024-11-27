import { Database } from "@/types/db"
import { createBrowserClient } from "@supabase/ssr"

let client: ReturnType<typeof createBrowserClient<Database>>

export default function getBrowserClient() {
    if (!client) {
        client = createBrowserClient<Database>(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        )
    }
    return client
}

export async function getSession() {
    const supabase = getBrowserClient()
    const {
        data: { session },
    } = await supabase.auth.getSession()
    return session
}
