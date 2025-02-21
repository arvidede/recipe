"use client"
import {
    ChangeEvent,
    MouseEvent,
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
} from "react"
import styles from "./EditableCell.module.scss"

interface Props {
    value: string
    name: string
    placeholder?: string
    type?: "input" | "textarea"
}

function EditableCell({ value, name, placeholder, type = "textarea" }: Props) {
    const ref = useRef<HTMLTextAreaElement>(null)
    const [input, setInput] = useState(value)

    const handleDelete = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        console.log(e.currentTarget.name)
    }, [])

    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setInput(e.target.value)
        },
        [],
    )

    useLayoutEffect(() => {
        if (type === "textarea" && ref.current) {
            ref.current.style.height = "auto"
            ref.current.style.height = ref.current.scrollHeight + "px"
        }
    }, [input])

    if (type === "input") {
        return (
            <div className={styles.container}>
                <input
                    placeholder={placeholder}
                    defaultValue={value}
                    name={name}
                />
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <textarea
                rows={1}
                placeholder={placeholder}
                ref={ref}
                value={input}
                onChange={handleInputChange}
                name={name}
            />
        </div>
    )
}

export default EditableCell
