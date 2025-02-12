interface Tag {
    name: string
    key: string
}

type Ingredient =
    | {
          name: string
      }
    | {
          name: string
          quantity: number
          unit: string
      }

interface Recipe {
    url: string
    img: string | null
    title: string
    originalTitle: string | null
    ingredients: Ingredient[]
    instructions: string[]
    tags: Tag[]
}

interface UserRecipe extends Recipe {
    id: string
    user: string
}

interface Query {
    key: string
    value: Recipe
}
