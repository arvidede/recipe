import clsx from "clsx"
import { FunctionComponent } from "react"
import Cutlery from "./Cutlery"
import Edit from "./Edit"
import Heart from "./Heart"
import styles from "./Icon.module.scss"
import Link from "./Link"
import Minus from "./Minus"
import Paste from "./Paste"
import Plus from "./Plus"
import Search from "./Search"
import Share from "./Share"

type IconVariant =
    | "edit"
    | "paste"
    | "cutlery"
    | "search"
    | "link"
    | "heart"
    | "share"
    | "plus"
    | "minus"
type IconSize = "s" | "m" | "l"

const ICON_MAP: Record<IconVariant, FunctionComponent> = {
    cutlery: Cutlery,
    edit: Edit,
    paste: Paste,
    search: Search,
    heart: Heart,
    link: Link,
    share: Share,
    plus: Plus,
    minus: Minus,
}

interface Props {
    variant: IconVariant
    size?: IconSize
}

export default function Icon({ variant, size = "m" }: Props) {
    const ICON = ICON_MAP[variant]
    return (
        <div className={clsx(styles.icon, styles[variant], styles[size])}>
            <ICON />
        </div>
    )
}
