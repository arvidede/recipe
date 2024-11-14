"use client"
import useIsMounted from "@/utils/hooks/useIsMounted"
import { isValidURL } from "@/utils/isValidUrl"
import clsx from "clsx"
import { ChangeEvent, useEffect, useRef } from "react"
import Button from "../Button"
import Icon from "../Icon"
import Spinner from "../Spinner"
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
    const response = await fetch(`/api/search?url=${url}`)

    if (response.ok) {
        return response.json()
    }

    return null
}

interface Props {
    onLoadRecipe: (recipe: Recipe | null) => void
    url?: string
}

function SearchBox({ onLoadRecipe, url }: Props) {
    const [state, dispatch] = useSearchReducer(url)
    const inputRef = useRef<HTMLInputElement>(null)
    const isMounted = useIsMounted()

    const handleSearchRecipe = async (url = state.input) => {
        if (isValidURL(url)) {
            dispatch({ type: ActionType.Loading, payload: true })

            try {
                const recipe = await getRecipe(url)
                if (recipe) {
                    onLoadRecipe(recipe)
                }
            } catch (e: any) {
                console.error(e)
            } finally {
                dispatch({ type: ActionType.Loading, payload: false })
            }
        }
    }

    const handlePaste = async () => {
        const url = await getURLFromClipboard()
        if (url) {
            dispatch({ type: ActionType.Input, payload: url })
            handleSearchRecipe(url)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ActionType.Input, payload: e.target.value })

        if (!e.target.value.length) {
            onLoadRecipe(null)
        }
    }

    const handleFocus = () => {
        inputRef.current?.setSelectionRange(0, state.input.length)
        if (!state.input.length) {
            handlePaste()
        }
    }

    useEffect(() => {
        handlePaste()
        handleSearchRecipe()

        const input = inputRef.current
        if (input) {
            if (!input.value.length) {
                input.focus()
            }

            input.addEventListener("paste", handlePaste)
            return () => {
                input.removeEventListener("paste", handlePaste)
            }
        }

        // This should only run on page load
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.container}>
            <input
                ref={inputRef}
                onFocus={handleFocus}
                type="text"
                value={state.input}
                onChange={handleChange}
                placeholder="Ge mig ett recept"
            />
            <div
                className={clsx({
                    [styles.end]: true,
                    [styles.mounted]: isMounted(),
                    [styles.loading]: state.loading,
                })}
            >
                <Spinner className={styles.spinner} />
                <Button
                    className={styles.button}
                    disabled={state.loading}
                    variant="icon"
                    onClick={() => handleSearchRecipe()}
                >
                    <Icon variant="cutlery" />
                </Button>
            </div>
        </div>
    )
}

export default SearchBox
