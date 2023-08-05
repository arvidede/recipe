"use client"

import Recipe from "@/components/Recipe/Recipe"
import SearchBox from "@/components/SearchBox"
import styles from "./page.module.css"
import { useState } from "react"

export default function Home() {
    const [recipe, setRecipe] = useState<Recipe | undefined>(undefined)

    return (
        <main className={styles.main}>
            <SearchBox onLoadRecipe={setRecipe} />
            <Recipe recipe={recipe} />
        </main>
    )
}
