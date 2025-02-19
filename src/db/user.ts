import isClient from "@/utils/isClient"

export async function getUser() {
    let mod

    if (isClient()) {
        mod = await import("./client")
    } else {
        mod = await import("./server")
    }

    return mod.getUser()
}

export async function isUserSignedIn() {
    const user = await getUser()
    return Boolean(user)
}
