export function isServer() {
    return typeof window === "undefined"
}

export default function isClient() {
    return !isServer()
}
