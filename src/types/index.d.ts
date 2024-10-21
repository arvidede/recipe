interface Tag {
    name: string
    key: string
}

interface Recipe {
    title: string
    originalTitle?: string
    ingredients: string[]
    instructions: string[]
    tags: Tag[]
}
