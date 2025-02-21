"use client"
import { ReactNode, useEffect, useRef, useState } from "react"

interface InViewProps {
    children: ReactNode
    threshold?: number
    rootMargin?: string
}

const InView: React.FC<InViewProps> = ({
    children,
    threshold = 0,
    rootMargin = "0px",
}) => {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const root = ref.current

        if (root) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true)
                        observer.unobserve(root)
                        observer.disconnect()
                    }
                },
                {
                    threshold,
                    rootMargin,
                },
            )

            observer.observe(root)

            return () => {
                observer.unobserve(root)
                observer.disconnect()
            }
        }
    }, [threshold, rootMargin])

    if (!isVisible) {
        return <div ref={ref} />
    }

    return <>{children}</>
}

export default InView
