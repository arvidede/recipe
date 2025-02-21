"use client"
import saveRecipe from "@/actions/recipe/saveRecipe"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import Button from "../Button"
import Icon from "../Icon"
import { Image } from "../Image"
import { Actions } from "./Actions"
import EditableCell from "./EditableCell"
import styles from "./Recipe.module.scss"

interface Props {
    recipe?: Recipe | null
    editable?: boolean
}

const Recipe = ({ recipe, editable: initiallyEditable = false }: Props) => {
    const formRef = useRef<HTMLFormElement>(null)
    const [editable, setEditable] = useState(initiallyEditable)

    async function handleSubmit() {
        if (formRef.current) {
            const formData = new FormData(formRef.current)

            const title = formData.get("title") as string

            const ingredientQuantities = formData.getAll("ingredient-quantity")
            const ingredientUnits = formData.getAll("ingredient-unit")
            const ingredientNames = formData.getAll("ingredient-name")

            const ingredients = ingredientNames.map((name, index) => {
                return {
                    name: name.toString().trim(),
                    unit: ingredientUnits[index],
                    quantity: ingredientQuantities[index].toString().trim(),
                } as Ingredient
            })

            const instructions = formData
                .getAll("instruction")
                .map((instruction) => instruction.toString().trim())

            const next: Recipe = {
                ...recipe!,
                title: title ?? "",
                ingredients,
                instructions,
            }

            await saveRecipe(next)

            setEditable(false)
        }
    }

    useEffect(() => {
        if (formRef.current) {
            formRef.current.addEventListener("change", console.log)
        }
    }, [])

    async function handleEdit() {
        if (!editable) {
            setEditable(true)
            return
        }

        handleSubmit()
    }

    return (
        <div
            className={clsx({
                [styles.container]: true,
                [styles.expanded]: recipe,
            })}
        >
            {recipe && (
                <form ref={formRef} className={styles.recipe}>
                    <Details
                        recipe={recipe}
                        onEdit={handleEdit}
                        editable={editable}
                    />
                    <Ingredients
                        ingredients={recipe.ingredients}
                        editable={editable}
                    />
                    <Instructions
                        instructions={recipe.instructions}
                        editable={editable}
                    />
                </form>
            )}
        </div>
    )
}

function Details({
    recipe,
    onEdit,
    editable,
}: {
    recipe: Recipe
    onEdit: () => void
    editable: boolean
}) {
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
            {editable ? (
                <EditableCell name="title" value={recipe.title} type="input" />
            ) : (
                <h1>{recipe.title}</h1>
            )}
            <Actions recipe={recipe} onEdit={onEdit} editable={editable} />
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
    if ("quantity" in ingredient && ingredient.quantity) {
        return `${ingredient.quantity} ${renderUnit(ingredient.unit)} ${ingredient.name.toLocaleLowerCase()}`
    }

    return ingredient.name
}

function Ingredients({
    ingredients,
    editable,
}: {
    ingredients: Ingredient[]
    editable: boolean
}) {
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
            <ul className={styles.list}>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {editable ? (
                            <div className={styles.editable}>
                                <EditableCell
                                    value={
                                        "quantity" in ingredient
                                            ? String(ingredient.quantity)
                                            : ""
                                    }
                                    name="ingredient-quantity"
                                    type="input"
                                />
                                <EditableCell
                                    value={
                                        "unit" in ingredient
                                            ? String(ingredient.unit)
                                            : ""
                                    }
                                    name="ingredient-unit"
                                    type="input"
                                />
                                <EditableCell
                                    value={ingredient.name}
                                    name="ingredient-name"
                                    type="input"
                                />
                            </div>
                        ) : (
                            renderIngredient(ingredient)
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}

function Instructions({
    instructions,
    editable,
}: {
    instructions: Recipe["instructions"]
    editable: boolean
}) {
    return (
        <section className={styles.instructions}>
            <h3>Steps</h3>
            <ol className={styles.list}>
                {instructions.map((instruction, index) => (
                    <li key={index}>
                        {editable ? (
                            <EditableCell
                                value={instruction}
                                name="instruction"
                            />
                        ) : (
                            instruction
                        )}
                    </li>
                ))}
            </ol>
        </section>
    )
}

export default Recipe
