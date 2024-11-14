import type { Database } from "@/types/db"
import { createClient } from "@supabase/supabase-js"

export default function getClient() {
    return createClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
            },
        },
    )
}
