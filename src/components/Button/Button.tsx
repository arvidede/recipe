import clsx from "clsx"
import { MouseEventHandler, ReactNode } from "react"
import styles from "./Button.module.scss"

interface Props {
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: string
    children?: ReactNode
}

export default function Button({ onClick, className, children }: Props) {
    return (
        <button onClick={onClick} className={clsx(styles.container, className)}>
            {children}
        </button>
    )
}
