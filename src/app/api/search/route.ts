import getDB from "@/db"
import { summariseRecipe } from "@/openai/prompts"
import { ENV } from "@/utils/env"
import { isValidURL } from "@/utils/isValidUrl"
import { getLogger } from "@/utils/log"
import { parsePage } from "@/utils/parsePage"
import { stripTrailingSlash } from "@/utils/stripTrailingSlash"
import { NextResponse } from "next/server"

const logger = getLogger("api:search")

const db = getDB()

export const maxDuration = 60

async function fetchRecipe(url: URL) {
    const page = await fetch(url)
    const html = await page.text()

    const { img, text } = await parsePage(html, url)
    const summary = await summariseRecipe(text)

    const recipe: Recipe = {
        img,
        url: url.href,
        ...summary,
    }

    return recipe
}

function validateRequest(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("url")

    if (!query || !isValidURL(query)) {
        throw new Response(
            `Error: Invalid param 'url' in request, received ${query}`,
            { status: 400 },
        )
    }

    return new URL(stripTrailingSlash(query))
}

export async function GET(request: Request) {
    try {
        const url = validateRequest(request)

        if (ENV.CACHE && db.has(url.href)) {
            return new Response(JSON.stringify(db.get(url.href)))
        }

        const recipe = await fetchRecipe(url)

        if (ENV.CACHE) {
            db.set(url.href, recipe)
        }

        return NextResponse.json(recipe, { status: 200 })
    } catch (e: any) {
        if (e instanceof Response) {
            logger.error(e.statusText)
            return e
        }

        logger.error(e.message)
        return new Response(`Error: ${e.message}`, { status: 500 })
    }
}
