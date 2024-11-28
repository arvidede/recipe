"use client"
import saveRecipe from "@/actions/recipe/saveRecipe"
import Button from "@/components/Button"
import Icon from "@/components/Icon"
import styles from "./Actions.module.scss"

export interface Props {
    recipe: Recipe
}

const Actions: React.FC<Props> = ({ recipe }) => {
    async function handleSaveRecipe() {
        await saveRecipe(recipe)
    }

    async function handleShareRecipe() {
        const shareData = {
            url: location.href,
            text: recipe.title,
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
                    <Icon variant="link" />
                </Button>
            </a>
            <Button variant="icon" onClick={handleSaveRecipe}>
                <Icon variant="heart" />
            </Button>
            <Button variant="icon" onClick={handleShareRecipe}>
                <Icon variant="share" />
            </Button>
            <Button variant="icon">
                <Icon variant="edit" />
            </Button>
        </div>
    )
}

export default Actions
