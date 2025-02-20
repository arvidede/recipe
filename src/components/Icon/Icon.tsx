import clsx from "clsx"
import { ComponentType, lazy, Suspense } from "react"
import styles from "./Icon.module.scss"

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
    | "mail"
    | "close"

const ICON_COMPONENTS: Record<IconType, ComponentType> = {
    cutlery: lazy(() => import("./Cutlery")),
    edit: lazy(() => import("./Edit")),
    paste: lazy(() => import("./Paste")),
    search: lazy(() => import("./Search")),
    heart: lazy(() => import("./Heart")),
    "heart-filled": lazy(() =>
        import("./Heart").then((it) => ({ default: it.HeartFilled })),
    ),
    link: lazy(() => import("./Link")),
    share: lazy(() => import("./Share")),
    plus: lazy(() => import("./Plus")),
    minus: lazy(() => import("./Minus")),
    user: lazy(() => import("./User")),
    exit: lazy(() => import("./Exit")),
    more: lazy(() => import("./More")),
    delete: lazy(() => import("./Delete")),
    copy: lazy(() => import("./Copy")),
    mail: lazy(() => import("./Mail")),
    close: lazy(() => import("./Close")),
}

type IconSize = "s" | "m" | "l"

type IconVariant = "solid" | "transparent" | "outlined"

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
    const IconComponent = ICON_COMPONENTS[type]

    if (!IconComponent) {
        return <span>Icon not found</span>
    }

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
            <Suspense fallback={null}>
                <IconComponent />
            </Suspense>
        </div>
    )
}
