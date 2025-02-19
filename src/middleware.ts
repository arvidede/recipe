import { getUser } from "@/db/server"
import { NextResponse, type NextRequest } from "next/server"

// const PROTECTED: Record<string, boolean> = {
//     "": false,
//     "/": false,
//     "/login": false,
//     "/auth": false,
//     "/home": true,
// }

// async function shouldRedirect(request: NextRequest) {
//     const user = await getUser()

//     return !user && PROTECTED[request.nextUrl.pathname]
// }

async function updateSession(request: NextRequest) {
    const supabaseResponse = NextResponse.next({
        request,
    })

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.
    // if (await shouldRedirect(request)) {
    //     const url = request.nextUrl.clone()
    //     url.pathname = "/login"
    //     return NextResponse.redirect(url)
    // }

    await getUser()

    return supabaseResponse
}

export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}
