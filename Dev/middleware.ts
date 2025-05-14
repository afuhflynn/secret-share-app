// middleware.ts
import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";
import { NextRequest, NextResponse } from "next/server";
import { devLog } from "./utils/devLog";

// 1) List any truly public pages here
const publicRoutes = new Set([
  "/terms-of-service",
  "/privacy-policy",
  "/pricing",
  "/about",
  "/contact",
  "/features",
  "/faqs",
  "/blog",
  "/blog/:slug",
]);
// define a list of dynamic‑route patterns you want to protect
const protectedPatterns = [
  /^\/[^\/]+$/, // /:user
  /^\/[^\/]+\/settings$/, // /:user/settings
  /^\/[^\/]+\/profile$/, // /:user/profile
  /^\/[^\/]+\/create$/, // /:user/create
  /^\/[^\/]+\/secret$/, // /:user/secret
  /^\/[^\/]+\/secret\/[^\/]+\/delete$/, // /:user/secret/:id/delete
  /^\/[^\/]+\/secret\/[^\/]+\/edit$/,
  /^\/[^\/]+\/secret\/[^\/]+\/share$/,
  /^\/s\/[^\/]+\/[^\/]+$/,
  /^\/s\/[^\/]+\/[^\/]+\/not-found$/,
];

export async function middleware(req: NextRequest) {
  const { auth } = NextAuth(authConfig);
  const session = await auth();
  const { pathname } = req.nextUrl;

  // 1) skip Next.js internals + public/static + auth routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname.includes(".") // e.g. .png, .css, etc.
  ) {
    return NextResponse.next();
  }
  // Public routes should also bypass our auth guard
  if (publicRoutes.has(pathname)) {
    return NextResponse.next();
  }

  // 2) if this path matches one of our protectedPatterns → enforce login
  const needsAuth = protectedPatterns.some((pattern) => pattern.test(pathname));

  if (needsAuth && !session) {
    devLog(`Unauthenticated access to ${pathname}`);
    return NextResponse.redirect(new URL("/auth/log-in", req.url));
  }

  // 3) otherwise, let it through
  return NextResponse.next();
}

// have middleware run on *all* routes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
