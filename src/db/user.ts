import isClient from "@/utils/isClient"

export async function getUser() {
    let mod

    if (isClient()) {
        mod = await import("./client")
    } else {
        mod = await import("./server")
    }

    const { data } = await mod.getUser()

    return data.user
}

export async function isUserSignedIn() {
    const user = await getUser()
    return Boolean(user)
}
