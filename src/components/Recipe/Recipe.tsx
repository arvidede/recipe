import clsx from "clsx"
import Card from "../Card"
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
                        <h2>{recipe.title}</h2>
                        <h4>Ingredients</h4>
                        <Card>
                            <section className={styles.list}>
                                <ul>
                                    {recipe.ingredients.map(
                                        (ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ),
                                    )}
                                </ul>
                            </section>
                        </Card>
                        <h3>Steps</h3>
                        <Card>
                            <section className={styles.list}>
                                <ol>
                                    {recipe.instructions.map(
                                        (instruction, index) => (
                                            <li key={index}>{instruction}</li>
                                        ),
                                    )}
                                </ol>
                            </section>
                        </Card>
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
