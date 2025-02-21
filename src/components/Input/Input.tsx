"use client"
import clsx from "clsx"
import { InputHTMLAttributes } from "react"
import styles from "./Input.module.scss"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

function Input({ className, type = "text", ...props }: Props) {
    return (
        <input
            {...props}
            type={type}
            className={clsx(styles.input, className)}
        />
    )
}

export default Input
