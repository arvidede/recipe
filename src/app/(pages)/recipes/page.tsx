import { RecipeCard } from "@/components/RecipeCard"
import getAllRecipes from "@/db/queries/getAllRecipes"
import styles from "./page.module.scss"

interface Props {}

export default async function Home({}: Props) {
    const { data: recipes, error } = await getAllRecipes()

    if (error) {
        return <h1>Something went wrong</h1>
    }

    return (
        <main className={styles.main}>
            <h1>Recipes</h1>
            {recipes.map((recipe) => {
                return <RecipeCard recipe={recipe} key={recipe.id} />
            })}
        </main>
    )
}
