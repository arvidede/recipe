/* eslint-disable jsx-a11y/alt-text */
"use client"
import deleteRecipe from "@/actions/recipe/deleteRecipe"
import { Routes } from "@/utils/constants"
import clsx from "clsx"
import NextImage from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ReactNode, useState } from "react"
import Button from "../Button"
import Card from "../Card"
import Icon from "../Icon"
import Cutlery from "../Icon/Cutlery"
import { Tooltip } from "../Tooltip"
import { TooltipItem } from "../Tooltip/Tooltip"
import styles from "./RecipeCard.module.scss"

const PLACEHOLDER_IMAGE = ""

function Item({ children }: { children: ReactNode }) {
    return <span className={styles.tooltipItem}>{children}</span>
}

export interface Props {
    recipe: UserRecipe
}

function RecipeCard({ recipe }: Props) {
    const router = useRouter()

    function getTooltipItems(): TooltipItem[] {
        return [
            {
                id: 1,
                value: (
                    <Item>
                        <Icon type="edit" variant="transparent" />
                        Edit
                    </Item>
                ),
                onClick: () => router.push(`${Routes.Recipe}/${recipe.id}`),
            },
            {
                id: 2,
                value: (
                    <Item>
                        <Icon type="delete" variant="transparent" />
                        Delete
                    </Item>
                ),
                onClick: () => {
                    deleteRecipe(recipe).then((success) => {
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
