"use client"

import Recipe from "@/components/Recipe/Recipe"
import SearchBox from "@/components/SearchBox"
import clsx from "clsx"
import { useState } from "react"
import styles from "./page.module.scss"

export default function Home() {
    const [recipe, setRecipe] = useState<Recipe | null>(null)

    return (
        <main className={styles.main}>
            <div
                className={clsx({
                    [styles.card]: true,
                    [styles.hasContent]: !!recipe,
                })}
            >
                <SearchBox onLoadRecipe={setRecipe} />
                <Recipe recipe={recipe} />
            </div>
        </main>
    )
}
