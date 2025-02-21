"use client"
import saveRecipe from "@/actions/recipe/saveRecipe"
import Button from "@/components/Button"
import Icon from "@/components/Icon"
import { useUser } from "@/components/Provider/UserProvider"
import { useState } from "react"
import styles from "./Actions.module.scss"

interface Props {
    recipe: Recipe
    onEdit: () => void
    editable: boolean
}

function useAction<T, A extends () => Promise<T>>(action: A) {
    const [loading, setLoading] = useState(false)

    async function act() {
        setLoading(true)
        try {
            await action()
        } catch (e: unknown) {
            console.error(e)
            // TODO
        } finally {
            setLoading(false)
        }
    }

    return {
        act,
        loading,
    }
}

function Actions({ recipe, onEdit, editable }: Props) {
    const saveAction = useAction(() => saveRecipe(recipe))

    const user = useUser()

    async function handleShareRecipe() {
        const shareData = {
            url: location.href,
            title: recipe.title,
        }

        if (navigator.share && navigator.canShare(shareData)) {
            navigator.share(shareData)
        } else {
            window.navigator.clipboard.writeText(shareData.url)
        }
    }

    return (
        <div className={styles.actions}>
            <a href={recipe.url}>
                <Button variant="icon">
                    <Icon type="link" />
                </Button>
            </a>
            <Button
                variant="icon"
                onClick={saveAction.act}
                loading={saveAction.loading}
            >
                <Icon type="heart" />
            </Button>
            <Button variant="icon" onClick={handleShareRecipe}>
                <Icon type="share" />
            </Button>
            {user && (
                <Button variant="icon" onClick={onEdit}>
                    <Icon type={editable ? "close" : "edit"} />
                </Button>
            )}
        </div>
    )
}

export default Actions
