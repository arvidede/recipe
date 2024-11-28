"use client"

import signOut from "@/actions/auth/signOut"
import { User } from "@supabase/supabase-js"
import Link from "next/link"
import Button from "../Button"
import styles from "./Header.module.scss"

export interface Props {
    user: User | null
}

function Header({ user }: Props) {
    return (
        <header className={styles.header}>
            {user ? (
                <>
                    <Button variant="outlined">
                        <Link href="/recipes">My Recpies</Link>
                    </Button>
                    <Button onClick={() => signOut()}>Sign Out</Button>
                </>
            ) : (
                <Button>
                    <Link href="/login">Sign In</Link>
                </Button>
            )}
        </header>
    )
}

export default Header
