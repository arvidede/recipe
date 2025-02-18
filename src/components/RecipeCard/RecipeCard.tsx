/* eslint-disable jsx-a11y/alt-text */
"use client"
import deleteRecipe from "@/actions/recipe/deleteRecipe"
import duplicateRecipe from "@/actions/recipe/duplicateRecipe"
import { Routes } from "@/utils/constants"
import clsx from "clsx"
import NextImage from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Button from "../Button"
import Card from "../Card"
import Icon from "../Icon"
import Cutlery from "../Icon/Cutlery"
import Tooltip, { TooltipItem } from "../Tooltip"
import styles from "./RecipeCard.module.scss"

const PLACEHOLDER_IMAGE = ""

export interface Props {
    recipe: UserRecipe
}

function RecipeCard({ recipe }: Props) {
    const router = useRouter()

    function getTooltipItems(): TooltipItem[] {
        return [
            {
                id: 0,
                value: (
                    <>
                        <Icon type="edit" variant="transparent" size="s" />
                        Edit
                    </>
                ),
                onClick: () => router.push(`${Routes.Recipe}/${recipe.id}`),
            },
            {
                id: 1,
                value: (
                    <>
                        <Icon type="delete" variant="transparent" size="s" />
                        Delete
                    </>
                ),
                onClick: () => {
                    deleteRecipe(recipe).then((success) => {
                        if (success) {
                            router.refresh()
                        }
                    })
                },
            },
            {
                id: 2,
                value: (
                    <>
                        <Icon type="copy" variant="transparent" size="s" />
                        Duplicate
                    </>
                ),
                onClick: () => {
                    duplicateRecipe(recipe).then((success) => {
                        if (success) {
                            router.refresh()
                        }
                    })
                },
            },
        ]
    }

    return (
        <Card className={styles.container}>
            <Link href={`${Routes.Recipe}/${recipe.id}`}>
                <Image recipe={recipe} />
                <div className={styles.details}>
                    <h4>{recipe.title}</h4>
                    <Tooltip items={getTooltipItems} onClick>
                        <Button
                            variant="transparent"
                            className={styles.moreButton}
                        >
                            <Icon type="more" variant="transparent" />
                        </Button>
                    </Tooltip>
                </div>
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
