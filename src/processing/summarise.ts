import { getLogger } from "@/utils/log"
import { generateObject, NoObjectGeneratedError } from "ai"
import { z } from "zod"
import model from "./model"
import RECIPE_SUMMARY_PROMPT from "./prompts"

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

const logger = getLogger("processing:summarise")

export async function summariseRecipe(recipe: string) {
    try {
        const { object } = await generateObject({
            model,
            schema: Recipe,
            system: RECIPE_SUMMARY_PROMPT,
            prompt: recipe,
        })

        return object
    } catch (error: any) {
        if (NoObjectGeneratedError.isInstance(error)) {
            logger.error(
                `No summary generated when processing recipe.`,
                `Cause: ${error.cause}`,
                `Text: ${error.text}`,
                `Response: ${error.response}`,
                `Usage: ${error.cause}`,
            )
        }

        logger.error(
            `Encountered unexpected error when processing recipe.`,
            `Cause: ${error.cause}`,
            `Text: ${error.text}`,
            `Response: ${error.response}`,
            `Usage: ${error.cause}`,
        )

        return null
    }
}
