"use client"
import clsx from "clsx"
import { ReactNode, useCallback, useState } from "react"
import { Image } from "../Image"
import EditRecipe from "./EditRecipe"
import styles from "./Recipe.module.scss"
import ViewRecipe from "./ViewRecipe"

interface Props {
    recipe?: Recipe | null
    editable?: boolean
}

function Recipe({ recipe, editable: initiallyEditable = false }: Props) {
    const [editable, setEditable] = useState(initiallyEditable)

    const handleEdit = useCallback(() => {
        setEditable((prev) => !prev)
    }, [])

    return (
        <ExpandableContainer expanded={!!recipe}>
            <div className={styles.recipe}>
                {recipe?.img && (
                    <Image
                        src={recipe.img}
                        alt={recipe.title}
                        className={styles.image}
                        fill
                    />
                )}
                {editable ? (
                    <EditRecipe recipe={recipe!} onEdit={handleEdit} />
                ) : (
                    <ViewRecipe recipe={recipe!} onEdit={handleEdit} />
                )}
            </div>
        </ExpandableContainer>
    )
}

function ExpandableContainer({
    expanded,
    children,
}: {
    expanded: boolean
    children: ReactNode
}) {
    return (
        <div
            className={clsx({
                [styles.container]: true,
                [styles.expanded]: expanded,
            })}
        >
            {expanded && children}
        </div>
    )
}

export default Recipe
