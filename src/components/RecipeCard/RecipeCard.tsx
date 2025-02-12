"use client"
import Image from "next/image"
import Link from "next/link"
import Card from "../Card"
import styles from "./RecipeCard.module.scss"

const PLACEHOLDER_IMAGE = ""

export interface Props {
    recipe: UserRecipe
}

function RecipeCard({ recipe }: Props) {
    return (
        <Card className={styles.container}>
            <Link href={`/recipe/${recipe.id}`}>
                <div className={styles.image}>
                    <Image
                        src={recipe.img || PLACEHOLDER_IMAGE}
                        alt={recipe.title}
                        sizes="300px"
                        fill
                        priority
                    />
                </div>
                <h4>{recipe.title}</h4>
            </Link>
        </Card>
    )
}

export default RecipeCard
