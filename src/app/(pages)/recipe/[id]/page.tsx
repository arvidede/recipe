import PageWrapper from "@/components/PageWrapper"
import Recipe from "@/components/Recipe"
import getRecipe from "@/db/queries/getRecipe"
import { notFound } from "next/navigation"
import styles from "./page.module.scss"

interface Props {
    params: Promise<{
        id: string
    }>
    searchParams: Promise<{
        edit?: boolean
    }>
}

export default async function RecipePage({ params, searchParams }: Props) {
    const { id } = await params
    const { edit } = await searchParams
    const recipe = await getRecipe(id)

    if (!recipe) {
        notFound()
    }

    return (
        <PageWrapper className={styles.main}>
            <Recipe recipe={recipe} editable={edit} />
        </PageWrapper>
    )
}
