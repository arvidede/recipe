export function isValidURL(query: string) {
    try {
        const newUrl = new URL(query)
        return newUrl.protocol === "http:" || newUrl.protocol === "https:"
    } catch (err) {
        return false
    }
}
