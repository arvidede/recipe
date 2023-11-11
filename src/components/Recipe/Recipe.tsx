import clsx from "clsx"
import Tag from "../Tag/Tag"
import styles from "./Recipe.module.scss"

interface Props {
    recipe?: Recipe | null
}

const Recipe = ({ recipe }: Props) => {
    return (
        <div
            className={clsx({
                [styles.container]: true,
                [styles.expanded]: recipe,
            })}
        >
            <div className={styles.recipe}>
                {recipe && (
                    <article>
                        <h3>{recipe.title}</h3>
                        <section>
                            <h4>Ingredients</h4>
                            <ul>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </section>
                        <section>
                            <h4>Steps</h4>
                            <ol>
                                {recipe.instructions.map(
                                    (instruction, index) => (
                                        <li key={index}>{instruction}</li>
                                    )
                                )}
                            </ol>
                        </section>
                        <section className={styles.tags}>
                            {recipe.tags.map((tag) => (
                                <Tag key={tag.key} tag={tag} />
                            ))}
                        </section>
                    </article>
                )}
            </div>
        </div>
    )
}

export default Recipe
