import "@/styles/globals.scss"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Viewport } from "next"

export const viewport: Viewport = {
    themeColor: "black",
    width: "device-width",
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
}

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Recipe",
    description: "Recipe Summariser",
    viewport,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
