"use client"
import clsx from "clsx"
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styles from "./Tooltip.module.scss"

interface Orientation {
    vertical: "top" | "bottom"
    horizontal: "left" | "right"
}

const PADDING = 100

function getTooltipPosition(anchor: Element) {
    const rect = anchor.getBoundingClientRect()

    const top = window.scrollY + rect.top + rect.height / 2
    const left = window.scrollX + rect.left + rect.width / 2
    const orientation: Orientation = {
        vertical: "bottom",
        horizontal: "left",
    }

    if (rect.bottom + PADDING > window.innerHeight) {
        orientation.vertical = "top"
    }

    if (rect.left - PADDING < 0) {
        orientation.horizontal = "right"
    }

    if (rect.right + PADDING > window.innerWidth) {
        orientation.horizontal = "left"
    }

    return {
        top,
        left,
        orientation,
    }
}

export interface TooltipItem {
    id: string | number
    value: ReactNode
    onClick?: (id: string | number) => void
}

interface Props {
    items: TooltipItem[] | (() => TooltipItem[])
    children: ReactNode
    onClick?: boolean
    onMouseEnter?: boolean
    anchorClassName?: string
}

interface PositonState {
    top: number
    left: number
    orientation: Orientation
}

function Tooltip({
    items,
    children,
    onMouseEnter,
    onClick,
    anchorClassName,
}: Props) {
    const anchorRef = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
    const [position, setPosition] = useState<PositonState>({
        top: 0,
        left: 0,
        orientation: {
            vertical: "bottom",
            horizontal: "left",
        },
    })

    function handleMouseMove() {
        if (!onMouseEnter) {
            return
        }
        setVisible((current) => !current)
    }

    function handleClick(e: MouseEvent<HTMLDivElement>) {
        if (!onClick) {
            return
        }
        e.preventDefault()
        e.stopPropagation()

        setVisible(true)
    }

    useEffect(() => {
        function handleClickOutside(e: Event) {
            if (e.target != anchorRef.current) {
                setVisible(false)
            }
        }

        function updatePosition() {
            if (!anchorRef.current) return
            const position = getTooltipPosition(anchorRef.current)
            setPosition(position)
        }

        if (visible && anchorRef.current) {
            updatePosition()

            document.addEventListener("click", handleClickOutside)
            window.addEventListener("resize", updatePosition)

            return () => {
                document.removeEventListener("click", handleClickOutside)
                window.removeEventListener("resize", updatePosition)
            }
        }
    }, [visible])

    return (
        <>
            <div
                className={anchorClassName}
                ref={anchorRef}
                onMouseEnter={handleMouseMove}
                onMouseLeave={handleMouseMove}
                onClick={handleClick}
            >
                {children}
            </div>
            {visible &&
                createPortal(
                    <div
                        className={clsx(
                            styles.tooltip,
                            styles[position.orientation.horizontal],
                            styles[position.orientation.vertical],
                        )}
                        style={{
                            top: position.top,
                            left: position.left,
                        }}
                    >
                        <ul>
                            {(Array.isArray(items) ? items : items()).map(
                                (item) => (
                                    <TooltipItem key={item.id} item={item} />
                                ),
                            )}
                        </ul>
                    </div>,
                    document.getElementById("modal")!,
                )}
        </>
    )
}

interface TooltipItemProps {
    item: TooltipItem
}

function TooltipItem({ item }: TooltipItemProps) {
    function handleClick(e: MouseEvent<HTMLLIElement>) {
        if (item.onClick) {
            e.preventDefault()
            e.stopPropagation()
            item.onClick(item.id)
        }
    }
    return <li onClick={handleClick}>{item.value}</li>
}

export default Tooltip
