"use client"
import { ChangeEvent, useState } from "react"
import styles from "./SearchBox.module.scss"
import clsx from "clsx"
import Button from "../Button"
import Paste from "../icons/Paste"
import Search from "../icons/Search"

interface Props {
    onLoadRecipe: (recipe: Recipe | null) => void
}

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms))

function isValidURL(url: string) {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

async function getURLFromClipboard(): Promise<string> {
    try {
        const value = await window.navigator.clipboard.readText()
        if (isValidURL(value)) {
            return value
        }
        return ""
    } catch {
        return ""
    }
}

function SearchBox({ onLoadRecipe }: Props) {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSearchRecipe = async (url: string) => {
        setLoading(true)

        try {
            const [response] = await Promise.all([
                fetch(`/api/search?url=${url}`),
                sleep(),
            ])

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

    const handlePaste = async () => {
        const url = await getURLFromClipboard()
        if (url) {
            setInput(url)
            handleSearchRecipe(url)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)

        if (isValidURL(e.target.value)) {
            handleSearchRecipe(e.target.value)
        } else {
            onLoadRecipe(null)
        }
    }

    const handleSearch = () => {}

    return (
        <div
            className={clsx({
                [styles.container]: true,
                [styles.loading]: loading,
            })}
        >
            <div className={styles.input}>
                <input
                    type="text"
                    value={input}
                    onChange={handleChange}
                    placeholder="Ge mig ett recept"
                />
                <Button className={styles.button} onClick={handlePaste}>
                    <Paste />
                </Button>
                <Button className={styles.button} onClick={handleSearch}>
                    <Search />
                </Button>
            </div>
        </div>
    )
}

export default SearchBox
