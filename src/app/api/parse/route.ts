import getDB from "@/db"
import { isValidURL } from "@/utils/isValidUrl"
import { getLogger } from "@/utils/log"
import { parsePage } from "@/utils/parsePage"
import { stripTrailingSlash } from "@/utils/stripTrailingSlash"

const logger = getLogger("api:parse")
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

    const { text } = await parsePage(html, url)
    return text
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

        const recipe = await fetchRecipe(url)

        return new Response(recipe, { status: 200 })
    } catch (e: unknown) {
        if (e instanceof RequestError) {
            return Response.json({ error: e.message }, { status: e.status })
        }

        if (e instanceof Error) {
            logger.error("Unexpected error:", e.message)
            return Response.json(
                { error: `Unexpected error: ${e.message}` },
                { status: 500 },
            )
        }

        logger.error("Unexpected error:", String(e))
        return Response.json(
            { error: `Unexpected error: ${String(e)}` },
            { status: 500 },
        )
    }
}
