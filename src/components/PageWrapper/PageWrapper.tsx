import clsx from "clsx"
import { ReactNode } from "react"
import styles from "./PageWrapper.module.scss"

export interface Props {
    children: ReactNode
    className?: string
}

const PageWrapper: React.FC<Props> = ({ children, className }) => {
    return <main className={clsx(styles.wrapper, className)}>{children}</main>
}

export default PageWrapper
