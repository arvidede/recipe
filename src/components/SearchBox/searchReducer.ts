import { useReducer } from "react"

export enum ActionType {
    Input,
    Loading,
}

type Action = InputAction | LoadingAction

interface LoadingAction {
    type: ActionType.Loading
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

function searchReducer(prevState: State, action: Action): State {
    switch (action.type) {
        case ActionType.Input:
            return {
                ...prevState,
                input: action.payload,
            }
        case ActionType.Loading:
            return {
                ...prevState,
                loading: !prevState.loading,
            }
    }
}

export default function useSearchReducer() {
    return useReducer(searchReducer, INITIAL_STATE)
}
