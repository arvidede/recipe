import styles from "./Tag.module.scss"
interface Props {
    tag: Tag
}

export default function Tag({ tag }: Props) {
    return <div className={styles.tag}>{tag.name}</div>
}
