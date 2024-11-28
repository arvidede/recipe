"use client"

import Recipe from "@/components/Recipe/Recipe"
import SearchBox from "@/components/SearchBox"
import clsx from "clsx"
import { useState } from "react"
import styles from "./SearchPage.module.scss"

interface Props {
    searchParams: { url?: string }
    recipe: Recipe | null
}

export default function SearchPage({
    searchParams,
    recipe: initialRecipe,
}: Props) {
    const [recipe, setRecipe] = useState(initialRecipe)

    return (
        <main className={styles.main}>
            <div
                className={clsx({
                    [styles.card]: true,
                    [styles.hasContent]: !!recipe,
                })}
            >
                <SearchBox onLoadRecipe={setRecipe} url={searchParams.url} />
                <Recipe recipe={recipe} />
            </div>
        </main>
    )
}
