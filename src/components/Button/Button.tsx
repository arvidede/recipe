import clsx from "clsx"
import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react"
import Spinner from "../Spinner"
import styles from "./Button.module.scss"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    loading?: boolean
    variant?: "text" | "icon" | "outlined" | "transparent"
}

function Button(
    {
        className,
        children,
        loading,
        variant = "text",
        type = "button",
        ...props
    }: Props,
    ref?: ForwardedRef<HTMLButtonElement>,
) {
    return (
        <button
            {...props}
            type={type}
            ref={ref}
            className={clsx(styles.container, styles[variant], className)}
        >
            {loading ? <Spinner className={styles.spinner} /> : children}
        </button>
    )
}

export default forwardRef(Button)
