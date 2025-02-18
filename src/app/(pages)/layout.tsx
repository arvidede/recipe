import { Header } from "@/components/Header"
import Provider from "@/components/Provider"
import { getUser } from "@/db/user"
import "@/styles/globals.scss"
import clsx from "clsx"
import type { Metadata } from "next"
import { Viewport } from "next"
import { PT_Serif } from "next/font/google"
import styles from "./layout.module.scss"

export const viewport: Viewport = {
    themeColor: "var(--background-color)",
    width: "device-width",
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
}

const font = PT_Serif({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
    title: "Recipe Summary",
    description: "Recipe Summary",
    appleWebApp: { statusBarStyle: "black-translucent" },
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUser()

    return (
        <html lang="en">
            <body className={clsx(font.className, styles.body)}>
                <Header user={user} />
                <Provider user={user}>{children}</Provider>
                <div id="modal" />
            </body>
        </html>
    )
}
