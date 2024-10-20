import { zodResponseFormat } from "openai/helpers/zod"
import { ChatCompletionMessageParam } from "openai/resources/chat/completions"
import { z } from "zod"
import openai from "./client"

const Tag = z.object({
    name: z.string(),
    key: z.string(),
})

const Ingredient = z.object({
    name: z.string(),
    quantity: z.number(),
    unit: z.string(),
})

const Recipe = z.object({
    title: z.string(),
    originalTitle: z.string(),
    ingredients: z.array(Ingredient),
    instructions: z.array(z.string()),
    tags: z.array(Tag),
})

const RECIPE_SUMMARY_PROMPT = `
You are a recipe summarizer.
You receive excerpts from recipe web pages that you summarize and format into a JSON object.
Tags should contain each ingredient. Similar ingredients should be grouped together under a single category.
Tags should also include the recipe category such as breakfast, lunch, dinner, snack, dessert, vegetarian.
A Tag is an object with the keys name and key, where name is human-readable, e.g., 'Creme Fraiche', and key is a database indexable slugified string without spaces, e.g., 'creme-fraiche'.
Replace all imperial units with metric units.
All output should be in English, except the originalTitle, which should be the original name of the recipe in the original language.
`

const RECIPE_SUMMARY_PROMPT_MESSAGE: ChatCompletionMessageParam = {
    role: "system",
    content: RECIPE_SUMMARY_PROMPT,
}

export async function summariseRecipe(recipe: string) {
    try {
        const chatCompletion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-mini",
            messages: [
                RECIPE_SUMMARY_PROMPT_MESSAGE,
                { role: "user", content: recipe },
            ],
            response_format: zodResponseFormat(Recipe, "recipe"),
        })

        const message = chatCompletion.choices[0].message?.parsed

        if (!message) {
            throw new Error(
                `GPT: No message in response. Received response ${JSON.stringify(
                    chatCompletion,
                    null,
                    2,
                )}`,
            )
        }
        return message
    } catch (error: any) {
        throw new Error(
            `GPT: No message in response. Received response ${JSON.stringify(
                error,
                null,
                2,
            )}`,
        )
    }
}
