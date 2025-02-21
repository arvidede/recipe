"use client"

import clsx from "clsx"
import NextImage, { ImageProps } from "next/image"
import { memo, useState } from "react"
import Cutlery from "../Icon/Cutlery"
import styles from "./Image.module.scss"

const PLACEHOLDER_IMAGE = ""

export interface Props extends Omit<ImageProps, "src"> {
    src: string | null
    className?: string
}

function Image({ className, src, ...props }: Props) {
    const [loading, setLoading] = useState(true)

    return (
        <div
            className={clsx(styles.imageWrapper, className)}
            style={{ height: props.height, width: props.width }}
        >
            {loading && (
                <div className={styles.placeholder}>
                    <Cutlery />
                </div>
            )}
            <NextImage
                {...props}
                src={src || PLACEHOLDER_IMAGE}
                className={clsx({
                    [styles.image]: true,
                    [styles.loading]: loading,
                })}
                onLoad={() => setLoading(false)}
            />
        </div>
    )
}

export default memo(Image)
