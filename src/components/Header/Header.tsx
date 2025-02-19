"use client"
import { Routes } from "@/utils/constants"
import { User } from "@supabase/supabase-js"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Icon from "../Icon"
import Tooltip from "../Tooltip"
import styles from "./Header.module.scss"

interface Props {
    user: User | null
}

function Header({ user }: Props) {
    const path = usePathname()

    function getTooltipItems() {
        return [
            {
                id: 0,
                value: <Link href={Routes.Home}>My recipes</Link>,
            },
            {
                id: 1,
                value: <Link href={Routes.Settings}>My settings</Link>,
            },
            {
                id: 2,
                value: <Link href={Routes.LogOut}>Sign out</Link>,
            },
        ]
    }
    return (
        <header className={styles.header}>
            <Link
                href={Routes.Search}
                className={clsx({
                    [styles.link]: true,
                    [styles.active]: path === Routes.Search,
                })}
            >
                <Icon variant="transparent" type="search" size="m" />
            </Link>
            {user ? (
                <Tooltip items={getTooltipItems} onClick>
                    <Icon
                        variant="transparent"
                        type="user"
                        size="m"
                        className={clsx({
                            [styles.link]: true,
                            [styles.active]: path === Routes.Home,
                        })}
                    />
                </Tooltip>
            ) : (
                <Link href={Routes.LogIn} className={styles.link}>
                    <Icon variant="transparent" type="user" size="m" />
                </Link>
            )}
        </header>
    )
}

export default Header
