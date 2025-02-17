"use client"

import Recipe from "@/components/Recipe/Recipe"
import SearchBox from "@/components/SearchBox"
import clsx from "clsx"
import { useState } from "react"
import PageWrapper from "../PageWrapper"
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
        <PageWrapper
            className={clsx({
                [styles.container]: true,
                [styles.hasContent]: !!recipe,
            })}
        >
            <SearchBox onLoadRecipe={setRecipe} url={searchParams.url} />
            <Recipe recipe={recipe} />
        </PageWrapper>
    )
}
