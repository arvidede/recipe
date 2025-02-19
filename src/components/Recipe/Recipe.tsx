import clsx from "clsx"
import Button from "../Button"
import Card from "../Card"
import Icon from "../Icon"
import { Image } from "../Image"
import Tag from "../Tag/Tag"
import { Actions } from "./Actions"
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
            {recipe && (
                <article className={styles.recipe}>
                    <Details recipe={recipe} />
                    <Ingredients ingredients={recipe.ingredients} />
                    <Instructions instructions={recipe.instructions} />
                </article>
            )}
        </div>
    )
}

function Details({ recipe }: { recipe: Recipe }) {
    return (
        <section className={styles.details}>
            {recipe.img && (
                <Image
                    src={recipe.img}
                    alt={recipe.title}
                    className={styles.image}
                    fill
                />
            )}
            <h1>{recipe.title}</h1>
            <Actions recipe={recipe} />
        </section>
    )
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
    if ("quantity" in ingredient) {
        return `${ingredient.quantity} ${renderUnit(ingredient.unit)} ${ingredient.name.toLocaleLowerCase()}`
    }

    return ingredient.name
}

function Ingredients({ ingredients }: { ingredients: Ingredient[] }) {
    return (
        <section className={styles.ingredients}>
            <div className={styles.servings}>
                <h3>Ingredients</h3>
                <div>
                    <Button variant="icon">
                        <Icon type="minus" size="s" />
                    </Button>
                    4 servings
                    <Button variant="icon">
                        <Icon type="plus" size="s" />
                    </Button>
                </div>
            </div>
            <Card padding className={styles.list}>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{renderIngredient(ingredient)}</li>
                    ))}
                </ul>
            </Card>
        </section>
    )
}

function Instructions({
    instructions,
}: {
    instructions: Recipe["instructions"]
}) {
    return (
        <section className={styles.instructions}>
            <h3>Steps</h3>
            <Card padding className={styles.list}>
                <ol>
                    {instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            </Card>
        </section>
    )
}

function Tags({ tags }: { tags: Recipe["tags"] }) {
    return (
        <section className={styles.tags}>
            {tags.map((tag) => (
                <Tag key={tag.key} tag={tag} />
            ))}
        </section>
    )
}

export default Recipe
