interface Tag {
    name: string
    key: string
}

interface Recipe {
    title: string
    ingredients: string[]
    instructions: string[]
    tags: Tag[]
}
