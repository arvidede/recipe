"use client"
import clsx from "clsx"
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styles from "./Tooltip.module.scss"

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
}

interface Orientation {
    vertical: "top" | "bottom"
    horizontal: "left" | "right"
}

const PADDING = 100

function getTooltipPosition(anchor: Element) {
    const rect = anchor.getBoundingClientRect()

    let top = window.scrollY + rect.top + rect.height / 2
    let left = window.scrollX + rect.left + rect.width / 2
    let orientation: Orientation = {
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

interface PositonState {
    top: number
    left: number
    orientation: Orientation
}

function Tooltip({ items, children, onMouseEnter, onClick }: Props) {
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

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
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

        function updatePosition(anchor: Element) {
            const position = getTooltipPosition(anchor)
            setPosition(position)
        }

        if (visible && anchorRef.current) {
            updatePosition(anchorRef.current)

            document.addEventListener("click", handleClickOutside)

            return () => {
                document.removeEventListener("click", handleClickOutside)
            }
        }
    }, [visible])

    console.log(position)

    return (
        <>
            <div
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
