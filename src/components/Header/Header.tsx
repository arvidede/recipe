import { Routes } from "@/utils/constants"
import { User } from "@supabase/supabase-js"
import Link from "next/link"
import Icon from "../Icon"
import styles from "./Header.module.scss"

interface Props {
    user: User | null
}

function Header({ user }: Props) {
    return (
        <header className={styles.header}>
            <Link href={Routes.Search}>
                <Icon
                    variant="transparent"
                    type="search"
                    size="m"
                    className={styles.icon}
                />
            </Link>
            <Link href={user ? Routes.Home : Routes.Login}>
                <Icon
                    variant="transparent"
                    type="user"
                    size="m"
                    className={styles.icon}
                />
            </Link>
        </header>
    )
}

export default Header
