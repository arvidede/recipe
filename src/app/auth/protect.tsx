import { getUser } from "@/db/server"
import { redirect } from "next/navigation"

export default async function protect() {
    const user = await getUser()

    if (!user) {
        return redirect("/login")
    }
}
