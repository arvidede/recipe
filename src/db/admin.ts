import { Database } from "@/types/db"
import { createClient } from "@supabase/supabase-js"

export default function getAdminClient() {
    return createClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
            },
        },
    )
}
