import Recipe from "@/components/Recipe"
import getRecipe from "@/db/recipes/getRecipe"
import { redirect } from "next/navigation"
import styles from "./page.module.scss"

interface Props {
    params: {
        id: string
    }
}

export default async function RecipePage({ params: { id } }: Props) {
    const recipe = await getRecipe(id)

    if (!recipe) {
        return redirect("/404")
    }

    return (
        <main className={styles.main}>
            <Recipe recipe={recipe} />
        </main>
    )
}
