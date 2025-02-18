"use client"
import { User } from "@supabase/supabase-js"
import { createContext, ReactNode, useContext } from "react"

const UserContext = createContext<User | null>(null)

export const useUser = () => useContext(UserContext)

interface Props {
    user: User | null
    children: ReactNode
}

export default function UserProvider({ user, children }: Props) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
