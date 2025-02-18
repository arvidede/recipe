import { User } from "@supabase/supabase-js"
import { ReactNode } from "react"
import UserProvider from "./UserProvider"

interface Props {
    user: User | null
    children: ReactNode
}

export default function Provider({ user, children }: Props) {
    return <UserProvider user={user}>{children}</UserProvider>
}
