/* eslint-disable jsx-a11y/alt-text */
"use client"
import deleteRecipe from "@/actions/recipe/deleteRecipe"
import duplicateRecipe from "@/actions/recipe/duplicateRecipe"
import { Routes } from "@/utils/constants"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Button from "../Button"
import Card from "../Card"
import Icon from "../Icon"
import { Image } from "../Image"
import Tooltip, { TooltipItem } from "../Tooltip"
import styles from "./RecipeCard.module.scss"
interface Props {
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
                    duplicateRecipe(recipe)
                },
            },
        ]
    }

    return (
        <Card className={styles.container}>
            <Link href={`${Routes.Recipe}/${recipe.id}`}>
                <Image
                    src={recipe.img}
                    alt={recipe.title}
                    sizes="300px"
                    fill
                    loading="lazy"
                    unoptimized
                    className={styles.image}
                />
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

export default RecipeCard
