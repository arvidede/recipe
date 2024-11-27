import getAllRecipes from "@/db/actions/getAllRecipes"
import styles from "./Home.module.scss"

interface Props {}

export default async function Home({}: Props) {
    const recipes = await getAllRecipes()

    return (
        <main className={styles.main}>
            <pre>{JSON.stringify(recipes, null, 2)}</pre>
        </main>
    )
}
