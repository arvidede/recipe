import clsx from "clsx"
import Image from "next/image"
import Button from "../Button"
import Card from "../Card"
import Icon from "../Icon"
import Tag from "../Tag/Tag"
import { Actions } from "./Actions"
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
                        <section className={styles.details}>
                            {recipe.img && (
                                <Image
                                    src={recipe.img}
                                    alt={recipe.title}
                                    width={200}
                                    height={200}
                                />
                            )}
                            <div>
                                <h1>{recipe.title}</h1>
                                <Actions recipe={recipe} />
                            </div>
                        </section>
                        <section className={styles.list}>
                            <div className={styles.ingredients}>
                                <h3>Ingredients</h3>
                                <div>
                                    <Button variant="icon">
                                        <Icon variant="minus" size="s" />
                                    </Button>
                                    4 servings
                                    <Button variant="icon">
                                        <Icon variant="plus" size="s" />
                                    </Button>
                                </div>
                            </div>
                            <Card>
                                <ul>
                                    {recipe.ingredients.map(
                                        (ingredient, index) => (
                                            <li key={index}>
                                                {renderIngredient(ingredient)}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </Card>
                        </section>
                        <section className={styles.list}>
                            <h3>Steps</h3>
                            <Card>
                                <ol>
                                    {recipe.instructions.map(
                                        (instruction, index) => (
                                            <li key={index}>{instruction}</li>
                                        ),
                                    )}
                                </ol>
                            </Card>
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
