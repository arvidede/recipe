import { User } from "@supabase/supabase-js"
import { ReactNode } from "react"
import SnackBarProvider from "./SnackBarProvider"
import UserProvider from "./UserProvider"

interface Props {
    user: User | null
    children: ReactNode
}

export default function Provider({ user, children }: Props) {
    return (
        <UserProvider user={user}>
            <SnackBarProvider>{children}</SnackBarProvider>
        </UserProvider>
    )
}
