import Button from "../Button"
import Icon from "../Icon"
import { Actions } from "./Actions"
import styles from "./Recipe.module.scss"

interface ViewRecipeProps {
    recipe: Recipe
    onEdit: () => void
}

function renderUnit(unitName: string): string {
    const UNIT_MAP: { [key: string]: string } = {
        milliliters: "ml",
        milliliter: "ml",
        deciliter: "dl",
        grams: "g",
        pieces: "",
        piece: "",
    }
    if (unitName in UNIT_MAP) {
        return UNIT_MAP[unitName]
    }
    return unitName
}

function renderIngredient(ingredient: Ingredient): string {
    if (ingredient.quantity && ingredient.unit) {
        return `${ingredient.quantity} ${renderUnit(ingredient.unit)} ${ingredient.name.toLocaleLowerCase()}`
    }
    if (ingredient.quantity) {
        return `${ingredient.quantity} ${ingredient.name.toLocaleLowerCase()}`
    }
    return ingredient.name
}

function Details({ recipe, onEdit }: { recipe: Recipe; onEdit: () => void }) {
    return (
        <section className={styles.details}>
            <h1>{recipe.title}</h1>
            <Actions recipe={recipe} onEdit={onEdit} editable={false} />
        </section>
    )
}

function ViewRecipe({ recipe, onEdit }: ViewRecipeProps) {
    return (
        <div className={styles.view}>
            <Details recipe={recipe} onEdit={onEdit} />
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
                <ul className={styles.list}>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{renderIngredient(ingredient)}</li>
                    ))}
                </ul>
            </section>
            <section className={styles.instructions}>
                <h3>Steps</h3>
                <ol className={styles.list}>
                    {recipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            </section>
        </div>
    )
}

export default ViewRecipe
