import { getLogger } from "@/utils/log"
import { generateObject, NoObjectGeneratedError } from "ai"
import { z } from "zod"
import model from "./model"
import RECIPE_SUMMARY_PROMPT from "./prompts"

const Tag = z.object({
    name: z
        .string()
        .describe("The human-readable name of the tag, e.g., 'Creme Fraiche'."),
    key: z
        .string()
        .describe(
            "A database-indexable, slugified string without spaces, e.g., 'creme-fraiche'.",
        ),
})

const Ingredient = z.object({
    name: z.string().describe("The name of the ingredient, e.g., 'Milk'."),
    quantity: z.number().describe("The quantity of the ingredient, e.g., 200."),
    unit: z
        .string()
        .describe(
            "The unit of measurement, e.g., 'grams', 'tablespoon', or '' for unitless items.",
        ),
})

const Recipe = z.object({
    title: z.string().describe("The English title of the recipe."),
    originalTitle: z
        .string()
        .describe("The original title of the recipe in its original language."),
    ingredients: z
        .array(Ingredient)
        .describe("An array of ingredient objects."),
    instructions: z
        .array(z.string())
        .describe("An array of instruction strings."),
    tags: z.array(Tag).describe("An array of tag objects."),
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
    } catch (error: unknown) {
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
            JSON.stringify(error),
        )

        return null
    }
}
