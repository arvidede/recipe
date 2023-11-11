"use client"

import Recipe from "@/components/Recipe/Recipe"
import SearchBox from "@/components/SearchBox"
import Card from "@/components/Card/Card"
import styles from "./page.module.scss"
import { useState } from "react"
import clsx from "clsx"

export default function Home() {
    const [recipe, setRecipe] = useState<Recipe | null>(null)

    return (
        <main className={styles.main}>
            <Card
                className={clsx({
                    [styles.search]: true,
                    [styles.hasContent]: !!recipe,
                })}
            >
                <SearchBox onLoadRecipe={setRecipe} />
                <Recipe recipe={recipe} />
            </Card>
        </main>
    )
}
