import getDB from "@/db"
import { summariseRecipe } from "@/processing/summarise"
import { ENV } from "@/utils/env"
import { isValidURL } from "@/utils/isValidUrl"
import { getLogger } from "@/utils/log"
import { parsePage } from "@/utils/parsePage"
import { stripTrailingSlash } from "@/utils/stripTrailingSlash"

const logger = getLogger("api:search")
const db = getDB()
export const maxDuration = 60

class RequestError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

async function fetchRecipe(url: URL) {
    const page = await fetch(url)
    const html = await page.text()

    const { img, text } = await parsePage(html, url)
    const summary = await summariseRecipe(text)

    if (!summary) {
        throw new RequestError(
            "The model was unable to generate a summary for the given input.",
            422,
        )
    }

    return {
        img,
        url: url.href,
        ...summary,
    }
}

function validateRequest(request: Request): URL {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("url")

    if (!query || !isValidURL(query)) {
        throw new RequestError(
            `Invalid param 'url' in request, received ${query}`,
            400,
        )
    }

    return new URL(stripTrailingSlash(query))
}

export async function GET(request: Request) {
    try {
        const url = validateRequest(request)

        if (ENV.CACHE && db.has(url.href)) {
            const cachedRecipe = await db.get(url.href)
            return Response.json(cachedRecipe, { status: 200 })
        }

        const recipe = await fetchRecipe(url)

        if (ENV.CACHE) {
            db.set(url.href, recipe)
        }

        return Response.json(recipe, { status: 200 })
    } catch (e: any) {
        if (e instanceof RequestError) {
            return Response.json({ error: e.message }, { status: e.status })
        }

        logger.error("Unexpected error:", e.message)
        return Response.json(
            { error: `Unexpected error: ${e.message}` },
            { status: 500 },
        )
    }
}
