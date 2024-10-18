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

function searchReducer(prevState: State, action: Action): State {
    switch (action.type) {
        case ActionType.Loading:
        case ActionType.Input:
            return {
                ...prevState,
                [action.type]: action.payload,
            }
    }
}

export default function useSearchReducer() {
    return useReducer(searchReducer, INITIAL_STATE)
}
