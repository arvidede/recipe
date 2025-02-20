import PageWrapper from "@/components/PageWrapper"
import Recipe from "@/components/Recipe"
import getRecipe from "@/db/queries/getRecipe"
import { notFound } from "next/navigation"
import styles from "./page.module.scss"

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function RecipePage({ params }: Props) {
    const { id } = await params
    const recipe = await getRecipe(id)

    if (!recipe) {
        notFound()
    }

    return (
        <PageWrapper className={styles.main}>
            <Recipe recipe={recipe} />
        </PageWrapper>
    )
}
