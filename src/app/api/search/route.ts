import DB from "@/db"
import { summariseRecipe } from "@/openai/prompts"
import { parsePage } from "@/utils/parsePage"
import { getLogger } from "@/utils/log"
import { isValidUrl } from "@/utils/isValidUrl"
import { stripTrailingSlash } from "@/utils/stripTrailingSlash"
import { ENV } from "@/utils/env"

const logger = getLogger("api:search")

const cache = new DB()

async function fetchRecipe(url: URL) {
    const page = await fetch(url)
    const html = await page.text()
    return parsePage(html, url)
}

function validateRequest(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("url")

    if (!query || !isValidUrl(query)) {
        logger.error(`Invalid param 'url' in request, received ${query}`)
        throw new Response(undefined, { status: 400 })
    }

    return new URL(stripTrailingSlash(query))
}

export async function GET(request: Request) {
    try {
        const url = validateRequest(request)

        if (ENV.CACHE && cache.has(url.href)) {
            return new Response(cache.get(url.href))
        }

        const recipe = await fetchRecipe(url)
        const summary = await summariseRecipe(recipe)

        if (ENV.CACHE) {
            cache.set(url.href, summary)
        }

        return new Response(summary, { status: 200 })
    } catch (e: any) {
        if (e instanceof Response) {
            return e
        }
        logger.error(e.message)
        return new Response(`Error: ${e.message}`, { status: 500 })
    }
}
