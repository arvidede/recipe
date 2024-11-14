import clsx from "clsx"
import { MouseEventHandler, ReactNode } from "react"
import styles from "./Button.module.scss"

interface Props {
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    className?: string
    children?: ReactNode
    variant?: "text" | "icon"
}

export default function Button({
    onClick,
    className,
    disabled,
    children,
    variant = "text",
}: Props) {
    return (
        <button
            onClick={onClick}
            className={clsx(styles.container, styles[variant], className)}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
