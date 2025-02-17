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

type BrowserClient = Awaited<ReturnType<typeof getBrowserClient>>

export async function getSession(client?: BrowserClient) {
    const supabase = client || getBrowserClient()
    const {
        data: { session },
    } = await supabase.auth.getSession()
    return session
}

export async function getUser(client?: BrowserClient) {
    const supabase = client || getBrowserClient()
    return supabase.auth.getUser()
}
