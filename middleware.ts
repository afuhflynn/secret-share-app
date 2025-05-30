// middleware.ts
import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";
import { NextRequest, NextResponse } from "next/server";
import { devLog } from "./utils/devLog";

// Public routes (regex)
const PUBLIC_ROUTES = [
  /^\/$/, // landing
  /^\/terms-of-service$/,
  /^\/privacy-policy$/,
  /^\/pricing$/,
  /^\/about$/,
  /^\/contact$/,
  /^\/features$/,
  /^\/faqs$/,
  /^\/blog$/,
  /^\/blog\/[^\/]+$/, // /blog/:slug
];

export async function middleware(req: NextRequest) {
  const { auth } = NextAuth(authConfig);
  const session = await auth();
  const { pathname } = req.nextUrl;

  // 0) If signed in AND already under /dashboard, just let it through.
  if (session) {
    const handle = "dashboard";
    if (handle && pathname.startsWith(`/${handle}`)) {
      devLog(`✔︎ Already under /${handle}, allowing ${pathname}`);
      return NextResponse.next();
    }
  }

  // 1) Skip Next.js internals, API/auth endpoints, and static files.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2) The root "/" route
  if (pathname === "/") {
    if (session) {
      // Authenticated on `/` → redirect to /username
      const handle = "dashboard";
      if (handle) {
        devLog(`→ Authenticated on "/" → redirect to /${handle}`);
        return NextResponse.redirect(new URL(`/${handle}`, req.url));
      }
      return NextResponse.next();
    }
    // Unauthenticated users can access the home page
    return NextResponse.next();
  }

  // 3) Public pages
  if (PUBLIC_ROUTES.some((rx) => rx.test(pathname))) {
    return NextResponse.next();
  }

  // 4) Protected pages require login
  if (
    (pathname.startsWith("/dashboard") || pathname.startsWith("/s")) &&
    !session
  ) {
    devLog(`→ Unauthenticated access to protected ${pathname}`);
    return NextResponse.redirect(new URL("/auth/log-in", req.url));
  }

  // 6) Everything else (deep nested under /:username or unlisted) passes
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
