/* eslint-disable jsx-a11y/alt-text */
"use client"
import { Routes } from "@/utils/constants"
import clsx from "clsx"
import NextImage from "next/image"
import Link from "next/link"
import { useState } from "react"
import Card from "../Card"
import Cutlery from "../Icon/Cutlery"
import styles from "./RecipeCard.module.scss"

const PLACEHOLDER_IMAGE = ""

export interface Props {
    recipe: UserRecipe
}

function RecipeCard({ recipe }: Props) {
    return (
        <Card className={styles.container}>
            <Link href={`${Routes.Recipe}/${recipe.id}`}>
                <Image recipe={recipe} />
                <h4>{recipe.title}</h4>
            </Link>
        </Card>
    )
}

function Image({ recipe }: { recipe: UserRecipe }) {
    const [loading, setLoading] = useState(true)

    return (
        <div className={styles.imageWrapper}>
            {loading && (
                <div className={styles.placeholder}>
                    <Cutlery />
                </div>
            )}
            <NextImage
                src={recipe.img || PLACEHOLDER_IMAGE}
                alt={recipe.title}
                sizes="300px"
                fill
                loading="lazy"
                unoptimized
                className={clsx({
                    [styles.image]: true,
                    [styles.loading]: loading,
                })}
                onLoadingComplete={() => setLoading(false)}
            />
        </div>
    )
}

export default RecipeCard
