import Tag from "../Tag/Tag"
import styles from "./Recipe.module.scss"

interface Props {
    recipe?: Recipe
}

const Recipe = ({ recipe }: Props) => {
    if (!recipe) return null
    return (
        <div className={styles.wrapper}>
            <h1>{recipe.title}</h1>
            <h3>Ingredienser</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instruktioner</h3>
            <ol>
                {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
            <h3>Taggar</h3>

            <div className={styles.tags}>
                {recipe.tags.map((tag) => (
                    <Tag key={tag.key} tag={tag} />
                ))}
            </div>
        </div>
    )
}

export default Recipe
