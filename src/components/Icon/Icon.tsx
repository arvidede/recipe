import clsx from "clsx"
import { FunctionComponent } from "react"
import Copy from "./Copy"
import Cutlery from "./Cutlery"
import Delete from "./Delete"
import Edit from "./Edit"
import Exit from "./Exit"
import Heart, { HeartFilled } from "./Heart"
import styles from "./Icon.module.scss"
import Link from "./Link"
import Minus from "./Minus"
import More from "./More"
import Paste from "./Paste"
import Plus from "./Plus"
import Search from "./Search"
import Share from "./Share"
import User from "./User"

type IconType =
    | "edit"
    | "paste"
    | "cutlery"
    | "search"
    | "link"
    | "heart"
    | "heart-filled"
    | "share"
    | "plus"
    | "minus"
    | "user"
    | "exit"
    | "more"
    | "delete"
    | "copy"

type IconSize = "s" | "m" | "l"

type IconVariant = "solid" | "transparent" | "outlined"

const ICON_MAP: Record<IconType, FunctionComponent> = {
    cutlery: Cutlery,
    edit: Edit,
    paste: Paste,
    search: Search,
    heart: Heart,
    "heart-filled": HeartFilled,
    link: Link,
    share: Share,
    plus: Plus,
    minus: Minus,
    user: User,
    exit: Exit,
    more: More,
    delete: Delete,
    copy: Copy,
}

interface Props {
    type: IconType
    variant?: IconVariant
    size?: IconSize
    className?: string
}

export default function Icon({
    type,
    className,
    variant = "solid",
    size = "m",
}: Props) {
    const ICON = ICON_MAP[type]
    return (
        <div
            className={clsx(
                styles.icon,
                styles[type],
                styles[variant],
                styles[size],
                className,
            )}
        >
            <ICON />
        </div>
    )
}
