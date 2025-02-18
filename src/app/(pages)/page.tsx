import { SearchPage } from "@/components/SearchPage"
import getDB from "@/db"
import { stripTrailingSlash } from "@/utils/stripTrailingSlash"

interface Props {
    searchParams: Promise<{ url?: string }>
}

export default async function Home({ searchParams }: Props) {
    const params = await searchParams
    const recipe = params.url
        ? await getDB().get(stripTrailingSlash(params.url))
        : null

    return <SearchPage searchParams={params} recipe={recipe} />
}
