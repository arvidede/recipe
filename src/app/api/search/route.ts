import DB from "@/db"
import { summariseRecipe } from "@/openai/prompts"
import { isValidUrl } from "@/utils/isValidUrl"
import { parsePage } from "@/utils/parsePage"
import { stripTrailingSlash } from "@/utils/stripTrailingSlash"

const cache = new DB()

const CACHE = true

async function fetchRecipe(url: URL) {
    const page = await fetch(url)
    const html = await page.text()
    return parsePage(html, url)
}

export async function POST(req: Request) {
    const query = await req.text()

    if (!query || !isValidUrl(query)) {
        return new Response(undefined, { status: 400 })
    }

    const url = new URL(stripTrailingSlash(query))

    if (CACHE && cache.has(url.href)) {
        console.log(`GET ${url} (cache: HIT)`)
        return new Response(cache.get(url.href))
    } else {
        console.log(`GET ${url} (cache: MISS)`)
    }

    const recipe = await fetchRecipe(url)

    console.log("\n\nPAGE RESPONSE\n", recipe, "\n")

    try {
        const summary = await summariseRecipe(recipe)
        console.log("\n\nGPT RESPONSE\n", summary, "\n")

        if (summary) {
            cache.set(url.href, summary)
        }

        return new Response(summary || "", {
            status: 200,
        })
    } catch (e: any) {
        console.log(e.response.status)
        console.log(e.response.data)
        return new Response()
    }
}
