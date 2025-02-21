import { Dispatch, SetStateAction, useEffect, useState } from "react"

export default function useReactiveState<S>(
    initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>] {
    const [state, setState] = useState(initialState)

    useEffect(() => {
        if (state != initialState) {
            setState(initialState)
        }
    }, [initialState])

    return [state, setState]
}
