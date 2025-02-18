import clsx from "clsx"
import { ForwardedRef, forwardRef, MouseEventHandler, ReactNode } from "react"
import styles from "./Button.module.scss"

interface Props {
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    className?: string
    children?: ReactNode
    variant?: "text" | "icon" | "outlined" | "transparent"
}

function Button(
    {
        onClick,
        className,
        disabled,
        children,

        variant = "text",
    }: Props,
    ref?: ForwardedRef<HTMLButtonElement>,
) {
    return (
        <button
            ref={ref}
            onClick={onClick}
            className={clsx(styles.container, styles[variant], className)}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default forwardRef(Button)
