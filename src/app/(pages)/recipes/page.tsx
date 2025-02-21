import protect from "@/app/auth/protect"
import InView from "@/components/InView"
import PageWrapper from "@/components/PageWrapper"
import { RecipeCard } from "@/components/RecipeCard"
import SearchBox from "@/components/SearchBox"
import getAllRecipes from "@/db/queries/getAllRecipes"
import { Suspense } from "react"
import Loading from "./loading"
import styles from "./page.module.scss"

export default async function Home() {
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
                <InView key={recipe.id}>
                    <RecipeCard recipe={recipe} />
                </InView>
            ))}
        </section>
    )
}
