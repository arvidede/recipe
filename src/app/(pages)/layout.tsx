import "@/styles/globals.scss"
import type { Metadata } from "next"
import { Viewport } from "next"
import { PT_Serif } from "next/font/google"

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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={font.className}>{children}</body>
        </html>
    )
}
