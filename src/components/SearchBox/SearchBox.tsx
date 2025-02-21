"use client"
import { Routes } from "@/utils/constants"
import useIsMounted from "@/utils/hooks/useIsMounted"
import { isValidURL } from "@/utils/isValidUrl"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useRef } from "react"
import Button from "../Button"
import Icon from "../Icon"
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
    onLoadRecipe?: (recipe: Recipe | null) => void
    url?: string
}

function SearchBox({ onLoadRecipe, url }: Props) {
    const [state, dispatch] = useSearchReducer(url)
    const inputRef = useRef<HTMLInputElement>(null)
    const isMounted = useIsMounted()
    const router = useRouter()

    function navigate(recipe: Recipe | null) {
        if (recipe) {
            const url = `${Routes.Search}?url=${recipe.url}`
            router.push(url)
        }
    }

    const onLoad = onLoadRecipe || navigate

    const handleSearchRecipe = async (url = state.input) => {
        if (isValidURL(url)) {
            dispatch({ type: ActionType.Loading, payload: true })

            try {
                const recipe = await getRecipe(url)
                if (recipe) {
                    onLoad(recipe)
                }
            } catch (e: unknown) {
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
            onLoad(null)
        }
    }

    const handleFocus = () => {
        inputRef.current?.setSelectionRange(0, state.input.length)
        if (!state.input.length) {
            handlePaste()
        }
    }

    useEffect(() => {
        const input = inputRef.current

        if (input) {
            const autoSearch = window.location.pathname === Routes.Search
            if (autoSearch && !input.value.length) {
                input.focus()
            }
        }
    }, [])

    return (
        <div className={styles.container}>
            <input
                ref={inputRef}
                onPaste={handlePaste}
                onFocus={handleFocus}
                type="text"
                value={state.input}
                onChange={handleChange}
                placeholder="https://recipe.com"
            />

            <Button
                className={clsx({
                    [styles.mounted]: isMounted(),
                    [styles.loading]: state.loading,
                })}
                disabled={state.loading}
                variant="icon"
                onClick={() => handleSearchRecipe()}
                loading={state.loading}
            >
                <Icon className={styles.icon} type="search" size="m" />
            </Button>
        </div>
    )
}

export default SearchBox
