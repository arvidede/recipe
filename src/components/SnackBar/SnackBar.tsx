"use client"
import clsx from "clsx"
import { ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import styles from "./SnackBar.module.scss"

interface Props {
    open: boolean
    children: ReactNode
    className?: string
}

export const TRANSITION_DELAY = 200

function SnackBar({ children, open, className }: Props) {
    const [debouncedOpen, setDebouncedOpen] = useState(false)

    useEffect(() => {
        if (open) {
            setDebouncedOpen(open)
        } else {
            const handler = setTimeout(() => {
                setDebouncedOpen(true)
            }, TRANSITION_DELAY)

            return () => {
                clearTimeout(handler)
            }
        }
    }, [open])

    if (!debouncedOpen) {
        return null
    }

    return createPortal(
        <div
            className={clsx([
                styles.snackBar,
                debouncedOpen && open && styles.open,
                className,
            ])}
        >
            {children}
        </div>,
        document.getElementById("modal")!,
    )
}

export default SnackBar
