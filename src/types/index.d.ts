interface Tag {
    name: string
    key: string
}

interface Ingredient {
    name: string
    quantity: number
    unit: string
}

interface Recipe {
    url: string
    img: string | null
    title: string
    originalTitle?: string
    ingredients: Ingredient[]
    instructions: string[]
    tags: Tag[]
}

interface Query {
    key: string
    value: Recipe
}
