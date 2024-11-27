import { getUser } from "@/db/server"
import { redirect } from "next/navigation"

export default async function protect() {
    const { error, data } = await getUser()
    if (error || !data?.user) {
        return redirect("/login")
    }
}
