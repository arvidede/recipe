import saveRecipe from "@/actions/recipe/saveRecipe"
import useReactiveState from "@/utils/hooks/useReactiveState"
import { useCallback, useEffect, useRef, useState } from "react"
import Button from "../Button"
import Icon from "../Icon"
import { Input } from "../Input"
import { useSnackbar } from "../Provider/SnackBarProvider"
import TextArea from "../TextArea"
import { Actions } from "./Actions"
import styles from "./Recipe.module.scss"

interface EditRecipeProps {
    recipe: Recipe
    onEdit: () => void
}

function sanitise(entry: FormDataEntryValue): string {
    return entry.toString().trim()
}

function EditRecipe({ recipe, onEdit }: EditRecipeProps) {
    const formRef = useRef<HTMLFormElement>(null)
    const [loading, setLoading] = useState(false)
    const touched = useRef(false)

    const [ingredients, setIngredients] = useReactiveState(
        recipe.ingredients || [],
    )
    const [instructions, setInstructions] = useReactiveState(
        recipe.instructions || [],
    )

    const snack = useSnackbar()

    useEffect(() => {
        snack.open(
            <div className={styles.snackBar}>
                <Button onClick={handleClose} variant="outlined">
                    Cancel
                </Button>
                <Button disabled>Save</Button>
            </div>,
        )
    }, [])

    const handleClose = useCallback(() => {
        snack.close()
        onEdit()
    }, [onEdit, snack.close])

    const handleSave = useCallback(async () => {
        if (!touched.current || !recipe || !formRef.current) {
            return
        }

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
            const instructions = formData.getAll("instruction").map(sanitise)
            const next: Recipe = {
                ...recipe,
                title,
                ingredients,
                instructions,
            }
            await saveRecipe(next)
        } finally {
            setLoading(false)
            handleClose()
        }
    }, [recipe, touched, handleClose])

    function handleChange() {
        if (!touched.current) {
            touched.current = true

            snack.open(
                <div className={styles.snackBar}>
                    <Button onClick={handleClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                </div>,
            )
        }
    }

    function handleDelete(type: "instruction" | "ingredient", index: number) {
        handleChange()
        if (type === "instruction") {
            setInstructions((current) => current.filter((_, i) => i !== index))
        } else {
            setIngredients((current) => current.filter((_, i) => i !== index))
        }
    }

    function handleAdd(type: "instruction" | "ingredient") {
        handleChange()
        if (type === "instruction") {
            setInstructions((current) => [...current, ""])
        } else {
            setIngredients((current) => [
                ...current,
                { name: "", quantity: undefined, unit: undefined },
            ])
        }
    }

    return (
        <form ref={formRef} className={styles.edit} onInput={handleChange}>
            <section className={styles.details}>
                <TextArea name="title" value={recipe.title} />
                <Actions recipe={recipe} onEdit={handleClose} editable />
            </section>
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
                                    onClick={() =>
                                        handleDelete("ingredient", index)
                                    }
                                    variant="transparent"
                                >
                                    <Icon type="close" variant="transparent" />
                                </Button>
                            </div>
                        </li>
                    ))}
                    <Button onClick={() => handleAdd("ingredient")}>
                        <Icon type="plus" /> Add ingredient
                    </Button>
                </ul>
            </section>
            <section className={styles.instructions}>
                <h3>Steps</h3>
                <ol className={styles.list}>
                    {instructions.map((instruction, index) => (
                        <li key={index}>
                            <div className={styles.editable}>
                                <TextArea
                                    value={instruction}
                                    name="instruction"
                                />
                                <Button
                                    onClick={() =>
                                        handleDelete("instruction", index)
                                    }
                                    variant="transparent"
                                >
                                    <Icon type="close" variant="transparent" />
                                </Button>
                            </div>
                        </li>
                    ))}
                    <Button onClick={() => handleAdd("instruction")}>
                        <Icon type="plus" /> Add instruction
                    </Button>
                </ol>
            </section>
        </form>
    )
}

export default EditRecipe
