"use client"
import saveRecipe from "@/actions/recipe/saveRecipe"
import useReactiveState from "@/utils/hooks/useReactiveState"
import clsx from "clsx"
import { useCallback, useRef, useState } from "react"
import Button from "../Button"
import Icon from "../Icon"
import { Image } from "../Image"
import { Input } from "../Input"
import TextArea from "../TextArea"
import { Actions } from "./Actions"
import styles from "./Recipe.module.scss"

interface Props {
    recipe?: Recipe | null
    editable?: boolean
}

function sanitise(entry: FormDataEntryValue) {
    return entry.toString().trim()
}

const Recipe = ({ recipe, editable: initiallyEditable = false }: Props) => {
    const formRef = useRef<HTMLFormElement>(null)
    const [editable, setEditable] = useState(initiallyEditable)
    const [touched, setTouched] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ingredients, setIngredients] = useReactiveState(
        recipe?.ingredients || [],
    )
    const [instructions, setInstructions] = useReactiveState(
        recipe?.instructions || [],
    )

    const handleChange = useCallback(() => {
        if (!touched) {
            setTouched(true)
        }
    }, [touched])

    const handleDelete = useCallback(
        (type: "instruction" | "ingredient", index: number) => {
            handleChange()
            if (type === "instruction") {
                setInstructions((current) =>
                    current.filter((_, i) => i !== index),
                )
            } else {
                setIngredients((current) =>
                    current.filter((_, i) => i !== index),
                )
            }
        },
        [handleChange],
    )

    const handleAdd = useCallback(
        (type: "instruction" | "ingredient") => {
            handleChange()
            if (type === "instruction") {
                setInstructions((current) => [...current, ""])
            } else {
                setIngredients((current) => [
                    ...current,
                    { name: "", quantity: undefined, unit: undefined },
                ])
            }
        },
        [handleChange],
    )

    const handleSubmit = useCallback(async () => {
        if (!recipe || !formRef.current) return

        setLoading(true)

        try {
            const formData = new FormData(formRef.current)
            const title = formData.get("title") as string
            const ingredientQuantities = formData.getAll("ingredient-quantity")
            const ingredientUnits = formData.getAll("ingredient-unit")
            const ingredientNames = formData.getAll("ingredient-name")
            const ingredients = ingredientNames
                .map((name, index) => ({
                    name: sanitise(name),
                    unit: sanitise(ingredientUnits[index]),
                    quantity: Number(sanitise(ingredientQuantities[index])),
                }))
                .filter(
                    (ingredient) =>
                        ingredient.name ||
                        ingredient.quantity ||
                        ingredient.unit,
                )
            const instructions = formData
                .getAll("instruction")
                .map(sanitise)
                .filter(Boolean)

            const next: Recipe = { ...recipe, title, ingredients, instructions }

            await saveRecipe(next)
            setEditable(false)
        } catch (e: unknown) {
            console.error("Failed to save recipe")
            // TODO
        } finally {
            setLoading(false)
        }
    }, [recipe])

    const handleEdit = useCallback(() => {
        if (!editable) {
            setEditable(true)
        } else {
            handleSubmit()
        }
    }, [editable, handleSubmit])

    return (
        <div
            className={clsx({
                [styles.container]: true,
                [styles.expanded]: recipe,
            })}
        >
            {recipe && (
                <form
                    ref={formRef}
                    className={styles.recipe}
                    onInput={handleChange}
                >
                    <Details
                        recipe={recipe}
                        onEdit={handleEdit}
                        editable={editable}
                    />
                    <Ingredients
                        ingredients={ingredients}
                        editable={editable}
                        onAdd={() => handleAdd("ingredient")}
                        onDelete={(i) => handleDelete("ingredient", i)}
                    />
                    <Instructions
                        instructions={instructions}
                        editable={editable}
                        onAdd={() => handleAdd("instruction")}
                        onDelete={(i) => handleDelete("instruction", i)}
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
                <TextArea name="title" value={recipe.title} />
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
    if (ingredient.quantity && ingredient.unit) {
        return `${ingredient.quantity} ${renderUnit(ingredient.unit)} ${ingredient.name.toLocaleLowerCase()}`
    }

    if (ingredient.quantity) {
        return `${ingredient.quantity} ${ingredient.name.toLocaleLowerCase()}`
    }

    return ingredient.name
}

function Ingredients({
    ingredients,
    editable,
    onAdd,
    onDelete,
}: {
    ingredients: Ingredient[]
    editable: boolean
    onAdd: () => void
    onDelete: (index: number) => void
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
                                <Input
                                    defaultValue={ingredient.quantity}
                                    name="ingredient-quantity"
                                />
                                <Input
                                    defaultValue={ingredient.unit}
                                    name="ingredient-unit"
                                />
                                <Input
                                    defaultValue={ingredient.name}
                                    name="ingredient-name"
                                />
                                <Button
                                    onClick={() => onDelete(index)}
                                    variant="transparent"
                                >
                                    <Icon type="close" variant="transparent" />
                                </Button>
                            </div>
                        ) : (
                            renderIngredient(ingredient)
                        )}
                    </li>
                ))}
                {editable && (
                    <Button onClick={onAdd}>
                        <Icon type="plus" /> Add ingredient
                    </Button>
                )}
            </ul>
        </section>
    )
}

function Instructions({
    instructions,
    editable,
    onAdd,
    onDelete,
}: {
    instructions: Recipe["instructions"]
    editable: boolean
    onAdd: () => void
    onDelete: (index: number) => void
}) {
    return (
        <section className={styles.instructions}>
            <h3>Steps</h3>
            <ol className={styles.list}>
                {instructions.map((instruction, index) => (
                    <li key={index}>
                        {editable ? (
                            <div className={styles.editable}>
                                <TextArea
                                    value={instruction}
                                    name="instruction"
                                />
                                <Button
                                    onClick={() => onDelete(index)}
                                    variant="transparent"
                                >
                                    <Icon type="close" variant="transparent" />
                                </Button>
                            </div>
                        ) : (
                            instruction
                        )}
                    </li>
                ))}

                {editable && (
                    <Button onClick={onAdd}>
                        <Icon type="plus" /> Add instruction
                    </Button>
                )}
            </ol>
        </section>
    )
}

export default Recipe
