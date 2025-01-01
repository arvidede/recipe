import { SearchPage } from "@/components/SearchPage"
import getDB from "@/db"
import { stripTrailingSlash } from "@/utils/stripTrailingSlash"

interface Props {
    searchParams: { url?: string }
}

export default async function Home({ searchParams }: Props) {
    const recipe = searchParams.url
        ? await getDB().get(stripTrailingSlash(searchParams.url))
        : null

    return <SearchPage searchParams={searchParams} recipe={recipe} />
}
