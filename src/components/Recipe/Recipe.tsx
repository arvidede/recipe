import clsx from "clsx"
import Image from "next/image"
import Button from "../Button"
import Card from "../Card"
import Tag from "../Tag/Tag"
import styles from "./Recipe.module.scss"

interface Props {
    recipe?: Recipe | null
}

const UNIT_MAP = {
    milliliters: "ml",
    milliliter: "ml",
    deciliter: "dl",
    grams: "g",
    pieces: "",
    piece: "",
}

function renderUnit(unitName: string) {
    if (unitName in UNIT_MAP) {
        return UNIT_MAP[unitName as keyof typeof UNIT_MAP]
    }
    return unitName
}

function renderIngredient(ingredient: Ingredient) {
    if (ingredient.quantity) {
        return `${ingredient.quantity} ${renderUnit(ingredient.unit)} ${ingredient.name.toLocaleLowerCase()}`
    }

    return ingredient.name
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
                        <div className={styles.title}>
                            {recipe.img && (
                                <Image
                                    src={recipe.img}
                                    alt={recipe.title}
                                    width={300}
                                    height={300}
                                />
                            )}
                            <div>
                                <h2>{recipe.title}</h2>
                                <p>{recipe.url}</p>
                            </div>
                        </div>
                        <div className={styles.ingredients}>
                            <h4>Ingredients</h4>
                            <div>
                                <Button>-</Button>4 servings
                                <Button>+</Button>
                            </div>
                        </div>
                        <Card>
                            <section className={styles.list}>
                                <ul>
                                    {recipe.ingredients.map(
                                        (ingredient, index) => (
                                            <li key={index}>
                                                {renderIngredient(ingredient)}
                                            </li>
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
