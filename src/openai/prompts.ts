import { ChatCompletionRequestMessage } from "openai"
import openai from "./client"

const RECIPE_SUMMARY_PROMPT = `
You are a recipe summarizer.
You receive excerpts from recipe web pages that you summarize and format into a JSON format according to {title: string, ingredients: string[], instructions: string[], tags: Tag[]}.
Tags should contain broader ingredient categories. Similar ingredients should be grouped together under a single category.
Tags should also include general recipe category tags such as breakfast, dinner, easy, vegetarian, meat.
A Tag is an object with the keys name and key, where name is human-readable, e.g., 'Creme Fraiche', and key is a database indexable slugified string without spaces, e.g., 'creme-fraiche'.
Replace all imperial units with metric units.
All output should be in English
`

const RECIPE_SUMMARY_PROMPT_MESSAGE: ChatCompletionRequestMessage = {
    role: "system",
    content: RECIPE_SUMMARY_PROMPT,
}

export async function summariseRecipe(recipe: string) {
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            RECIPE_SUMMARY_PROMPT_MESSAGE,
            { role: "user", content: recipe },
        ],
    })

    return chatCompletion.data.choices[0].message?.content
}
