"use client"

import getBrowserClient from "@/db/client"
import { FormEvent, useState } from "react"
import styles from "./Login.module.scss"

const Login: React.FC = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const { error } = await getBrowserClient().auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: false,
                emailRedirectTo: window.location.origin,
            },
        })

        setLoading(false)

        if (error) {
            console.error(error)
            // It would be prudent to provide this feedback to the user
            // Teehee
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="submit"
                value={loading ? "..." : "Logga in"}
                disabled={loading}
            />
        </form>
    )
}

export default Login
