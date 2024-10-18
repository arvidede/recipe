"use client"
import { isValidURL } from "@/utils/isValidUrl"
import sleep from "@/utils/sleep"
import clsx from "clsx"
import { ChangeEvent, useEffect } from "react"
import Button from "../Button"
import Paste from "../icons/Paste"
import Search from "../icons/Search"
import styles from "./SearchBox.module.scss"
import useSearchReducer, { ActionType } from "./searchReducer"

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

async function getRecipe(url: string): Promise<Recipe | null> {
    const [response] = await Promise.all([
        fetch(`/api/search?url=${url}`),
        sleep(1000),
    ])

    if (response.ok) {
        return response.json()
    }

    return null
}

interface Props {
    onLoadRecipe: (recipe: Recipe | null) => void
}

function SearchBox({ onLoadRecipe }: Props) {
    const [state, dispatch] = useSearchReducer()

    const handleSearchRecipe = async () => {
        if (isValidURL(state.input)) {
            dispatch({ type: ActionType.Loading })

            try {
                const recipe = await getRecipe(state.input)
                if (recipe) {
                    onLoadRecipe(recipe)
                }
            } catch (e: any) {
                console.error(e)
            } finally {
                dispatch({ type: ActionType.Loading })
            }
        }
    }

    const handlePaste = async () => {
        const url = await getURLFromClipboard()
        if (url) {
            dispatch({ type: ActionType.Input, payload: url })
            handleSearchRecipe()
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ActionType.Input, payload: e.target.value })

        if (!e.target.value.length) {
            onLoadRecipe(null)
        }
    }

    useEffect(() => {
        handlePaste()
        // This should only run on page load
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            className={clsx({
                [styles.container]: true,
                [styles.loading]: state.loading,
            })}
        >
            <div className={styles.input}>
                <input
                    autoFocus
                    type="text"
                    value={state.input}
                    onChange={handleChange}
                    placeholder="Ge mig ett recept"
                />
                <Button className={styles.button} onClick={handlePaste}>
                    <Paste />
                </Button>
                <Button className={styles.button} onClick={handleSearchRecipe}>
                    <Search />
                </Button>
            </div>
        </div>
    )
}

export default SearchBox
