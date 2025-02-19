import protect from "@/app/auth/protect"
import PageWrapper from "@/components/PageWrapper"
import { RecipeCard } from "@/components/RecipeCard"
import SearchBox from "@/components/SearchBox"
import getAllRecipes from "@/db/queries/getAllRecipes"
import { Suspense } from "react"
import Loading from "./loading"
import styles from "./page.module.scss"

interface Props {}

export default async function Home({}: Props) {
    await protect()
    return (
        <PageWrapper className={styles.main}>
            <SearchBox />
            <h1>My Recipes</h1>
            <Suspense fallback={<Loading />}>
                <Recipes />
            </Suspense>
        </PageWrapper>
    )
}

async function Recipes() {
    const { data: recipes, error } = await getAllRecipes()

    if (error) {
        return <h1>Something went wrong</h1>
    }

    return (
        <section className={styles.recipes}>
            {recipes.map((recipe) => (
                <RecipeCard recipe={recipe} key={recipe.id} />
            ))}
        </section>
    )
}
