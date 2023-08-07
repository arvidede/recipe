"use client"
import { ChangeEvent, useState } from "react"
import styles from "./SearchBox.module.scss"
import Spinner from "../Spinner"

interface Props {
    onLoadRecipe: (recipe: Recipe) => void
}

function SearchBox({ onLoadRecipe }: Props) {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)

        if (e.target.value) {
            setLoading(true)

            try {
                const url = `/api/search`
                const response = await fetch(url)

                if (response.ok) {
                    const recipe: Recipe = await response.json()
                    onLoadRecipe(recipe)
                }
            } catch (e: any) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                className={styles.input}
                value={input}
                onChange={handleChange}
            />
            {loading && <Spinner className={styles.spinner} />}
        </div>
    )
}

export default SearchBox
