import clsx from "clsx"
import type { ReactNode } from "react"
import styles from "./Card.module.scss"

interface Props {
    children?: ReactNode
    className?: string
}
export default function Card({ children, className }: Props) {
    return <div className={clsx(styles.container, className)}>{children}</div>
}
