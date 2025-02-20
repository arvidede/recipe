"use client"
import saveRecipe from "@/actions/recipe/saveRecipe"
import Button from "@/components/Button"
import Icon from "@/components/Icon"
import styles from "./Actions.module.scss"

interface Props {
    recipe: Recipe
    onEdit: () => void
    editable: boolean
}

function Actions({ recipe, onEdit, editable }: Props) {
    async function handleSaveRecipe() {
        await saveRecipe(recipe)
    }

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
            <Button variant="icon" onClick={handleSaveRecipe}>
                <Icon type="heart" />
            </Button>
            <Button variant="icon" onClick={handleShareRecipe}>
                <Icon type="share" />
            </Button>
            <Button variant="icon" onClick={onEdit}>
                <Icon type={editable ? "close" : "edit"} />
            </Button>
        </div>
    )
}

export default Actions
