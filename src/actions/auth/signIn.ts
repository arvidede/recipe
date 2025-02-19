"use server"

import getServerClient from "@/db/server"
import { getLogger } from "@/utils/log"

const logger = getLogger("auth:signin")
export interface ActionState {
    error?: string
    data?: boolean
    redirect?: string
}

export default async function signIn(
    state: ActionState,
    formData: FormData,
): Promise<ActionState> {
    const email = String(formData.get("email"))

    const supabase = await getServerClient()

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: false,
            emailRedirectTo: state.redirect || "https://recipe.edenheim.se",
        },
    })

    if (error) {
        logger.info(error)

        return {
            error: "Error",
        }
    }

    return {
        data: true,
    }
}
