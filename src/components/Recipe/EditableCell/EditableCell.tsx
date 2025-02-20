"use client"
import { MouseEvent, useCallback, useEffect, useRef } from "react"
import styles from "./EditableCell.module.scss"

interface Props {
    value: string
    name: string
    placeholder?: string
    type?: "input" | "textarea"
}

function EditableCell({ value, name, placeholder, type = "textarea" }: Props) {
    const ref = useRef<HTMLTextAreaElement>(null)

    const handleDelete = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        console.log(e.currentTarget.name)
    }, [])

    useEffect(() => {
        if (type === "textarea" && ref.current) {
            ref.current.style.height = "auto"
            ref.current.style.height = ref.current.scrollHeight + "px"
        }
    }, [value])

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
                placeholder={placeholder}
                rows={1}
                ref={ref}
                defaultValue={value}
                name={name}
            />
            {/* <Button variant="transparent" onClick={handleDelete}>
                <Icon type="close" variant="transparent" />
            </Button> */}
        </div>
    )
}

export default EditableCell
