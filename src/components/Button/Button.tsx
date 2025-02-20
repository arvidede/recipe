import clsx from "clsx"
import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react"
import styles from "./Button.module.scss"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    variant?: "text" | "icon" | "outlined" | "transparent"
}

function Button(
    { className, children, variant = "text", type = "button", ...props }: Props,
    ref?: ForwardedRef<HTMLButtonElement>,
) {
    return (
        <button
            {...props}
            type={type}
            ref={ref}
            className={clsx(styles.container, styles[variant], className)}
        >
            {children}
        </button>
    )
}

export default forwardRef(Button)
