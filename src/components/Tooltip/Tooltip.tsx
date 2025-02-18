"use client"
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

function Tooltip({ items, children, onMouseEnter, onClick }: Props) {
    const anchorRef = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0 })

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

        if (visible && anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect()
            setPosition({
                top: window.scrollY + rect.top + rect.height / 2,
                left: rect.left + rect.width / 2,
            })

            document.addEventListener("click", handleClickOutside)

            return () => {
                document.removeEventListener("click", handleClickOutside)
            }
        }
    }, [visible])

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
                        className={styles.tooltip}
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
