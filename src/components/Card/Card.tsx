import clsx from "clsx"
import type { ReactNode } from "react"
import styles from "./Card.module.scss"

interface Props {
    children?: ReactNode
    className?: string
    padding?: boolean
}
export default function Card({ children, className, padding }: Props) {
    return (
        <div
            className={clsx(
                styles.container,
                padding && styles.padding,
                className,
            )}
        >
            {children}
        </div>
    )
}
