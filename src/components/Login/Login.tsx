"use client"

import signIn, { ActionState } from "@/actions/auth/signIn"
import isClient from "@/utils/isClient"
import clsx from "clsx"
import {
    FormEvent,
    startTransition,
    useActionState,
    useEffect,
    useState,
} from "react"
import Button from "../Button"
import Icon from "../Icon"
import { Input } from "../Input"
import styles from "./Login.module.scss"

const initialState: ActionState = {
    data: undefined,
    error: undefined,
    redirect: isClient() ? window.location.origin : "",
}

function openMailApp() {
    const userAgent = navigator.userAgent.toLowerCase()

    if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
        window.location.href = "message://"
    } else if (userAgent.includes("android")) {
        window.location.href =
            "intent://#Intent;action=android.intent.action.MAIN;category=android.intent.category.APP_EMAIL;end;"
    } else {
        window.location.href = "mailto:"
    }
}

const Login: React.FC = () => {
    const [submitted, setSubmitted] = useState(false)
    const [state, action, pending] = useActionState(signIn, initialState)

    useEffect(() => {
        if (state.data) {
            setSubmitted(true)
        }
    }, [state])

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        startTransition(() => action(formData))
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div
                className={clsx({
                    [styles.group]: true,
                    [styles.fadeOut]: submitted,
                })}
            >
                <Input
                    name="email"
                    type="email"
                    required
                    autoFocus
                    placeholder="Email"
                />
                <Button type="submit" disabled={pending}>
                    Sign In
                </Button>
            </div>
            <div
                className={clsx({
                    [styles.group]: true,
                    [styles.fadeIn]: submitted,
                })}
            >
                <span>
                    <Icon type="mail" size="l" variant="transparent" />
                    <h2>Check your email</h2>
                </span>
                <Button
                    type="button"
                    variant="outlined"
                    onClick={() => setSubmitted(false)}
                >
                    Back
                </Button>
                <Button type="button" onClick={openMailApp}>
                    Check inbox
                </Button>
            </div>
        </form>
    )
}

export default Login
