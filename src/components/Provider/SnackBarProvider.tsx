"use client"
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react"
import SnackBar, { TRANSITION_DELAY } from "../SnackBar"

interface SnackBarState {
    open: boolean
    content: ReactNode | null
}

const DEFAULT_STATE = {
    open: false,
    content: null,
}

interface SnackBarHandler {
    open: (content: ReactNode) => void
    close: () => void
}

const SnackBarContext = createContext<SnackBarHandler>({
    open: () => {},
    close: () => {},
})

export const useSnackbar = () => useContext(SnackBarContext)

interface Props {
    children: ReactNode
}

export default function SnackBarProvider({ children }: Props) {
    const [state, setState] = useState<SnackBarState>(DEFAULT_STATE)

    const open = useCallback((content: ReactNode) => {
        setState({ open: true, content })
    }, [])

    const close = useCallback(() => {
        setState((current) => ({ open: false, content: current.content }))
        setTimeout(() => {
            setState({ open: false, content: null })
        }, TRANSITION_DELAY)
    }, [])

    return (
        <SnackBarContext.Provider
            value={useMemo(() => ({ open, close }), [open, close])}
        >
            {children}
            <SnackBar open={state.open}>{state.content}</SnackBar>
        </SnackBarContext.Provider>
    )
}
