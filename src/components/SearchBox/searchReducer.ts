import { useSearchParams } from "next/navigation"
import { useReducer } from "react"

export enum ActionType {
    Input = "input",
    Loading = "loading",
}

type Action = InputAction | LoadingAction

interface LoadingAction {
    type: ActionType.Loading
    payload: boolean
}

interface InputAction {
    type: ActionType.Input
    payload: string
}
interface State {
    input: string
    loading: boolean
    recipe: Recipe | null
}

const INITIAL_STATE = {
    input: "",
    loading: false,
    recipe: null,
}

function updateQueryParam(url: string) {
    if (url) {
        try {
            const param = `?url=${encodeURI(url)}`
            window.history.replaceState(null, "", param)
        } catch {}
    } else {
        const url = new URL(location.href)
        url.searchParams.delete("url")
        window.history.replaceState(null, "", url.toString())
    }
}

function searchReducer(prevState: State, action: Action): State {
    switch (action.type) {
        case ActionType.Loading:
            return {
                ...prevState,
                [action.type]: action.payload,
            }
        case ActionType.Input:
            updateQueryParam(action.payload)

            return {
                ...prevState,
                [action.type]: action.payload,
            }
    }
}

export default function useSearchReducer() {
    const params = useSearchParams()
    const url = params.get("url")
    const initialState = { ...INITIAL_STATE, input: url ?? "" }
    return useReducer(searchReducer, initialState)
}
