"use client"
import Button from "@/components/Button"
import Icon from "@/components/Icon"
import styles from "./Actions.module.scss"

export interface Props {
    recipe: Recipe
}

const Actions: React.FC<Props> = ({ recipe }) => {
    return (
        <div className={styles.actions}>
            <a href={recipe.url}>
                <Button variant="icon">
                    <Icon variant="link" />
                </Button>
            </a>
            <Button variant="icon">
                <Icon variant="heart" />
            </Button>
            <Button variant="icon">
                <Icon variant="share" />
            </Button>
            <Button variant="icon">
                <Icon variant="edit" />
            </Button>
        </div>
    )
}

export default Actions
