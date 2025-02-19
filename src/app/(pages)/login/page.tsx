import LoginForm from "@/components/Login"
import PageWrapper from "@/components/PageWrapper"
import { getUser } from "@/db/server"
import { Routes } from "@/utils/constants"
import { redirect } from "next/navigation"

export default async function Login() {
    const user = await getUser()

    if (user) {
        redirect(Routes.Home)
    }

    return (
        <PageWrapper>
            <LoginForm />
        </PageWrapper>
    )
}
