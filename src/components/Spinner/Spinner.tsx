import clsx from "clsx"
import styles from "./Spinner.module.scss"

interface Props {
    className?: string
}

const Spinner = ({ className }: Props) => {
    return <div className={clsx(styles.spinner, className)} />
}

export default Spinner
