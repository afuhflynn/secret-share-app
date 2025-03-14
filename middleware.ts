import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

// Function to check if we're in development mode
function isDevelopment() {
  return process.env.NODE_ENV === "development"
}

// In development mode, we'll bypass the middleware completely
export default isDevelopment()
  ? (req: any) => NextResponse.next()
  : withAuth(
      async function middleware(req) {
        const token = await getToken({ req })
        const isAuth = !!token
        const isAuthPage =
          req.nextUrl.pathname.startsWith("/login") ||
          req.nextUrl.pathname.startsWith("/signup") ||
          req.nextUrl.pathname.startsWith("/verify-email")

        if (isAuthPage) {
          if (isAuth) {
            return NextResponse.redirect(new URL("/dashboard", req.url))
          }
          return null
        }

        if (!isAuth && req.nextUrl.pathname.startsWith("/dashboard")) {
          return NextResponse.redirect(new URL("/login", req.url))
        }

        return null
      },
      {
        callbacks: {
          async authorized() {
            // This is a work-around for handling redirect on auth pages.
            // We return true here so that the middleware function above
            // is always called.
            return true
          },
        },
      },
    )

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/verify-email"],
}

