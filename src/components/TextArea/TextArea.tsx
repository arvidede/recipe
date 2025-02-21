"use client"
import {
    ChangeEvent,
    TextareaHTMLAttributes,
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
} from "react"
import styles from "./TextArea.module.scss"

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

function TextArea({ value, name, placeholder }: Props) {
    const ref = useRef<HTMLTextAreaElement>(null)
    const [input, setInput] = useState(value)

    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setInput(e.target.value)
        },
        [],
    )

    useLayoutEffect(() => {
        if (ref.current) {
            ref.current.style.height = "auto"
            ref.current.style.height = ref.current.scrollHeight + "px"
        }
    }, [input])

    return (
        <textarea
            className={styles.textArea}
            rows={1}
            placeholder={placeholder}
            ref={ref}
            value={input}
            onChange={handleInputChange}
            name={name}
        />
    )
}

export default TextArea
