import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";
import { NextRequest, NextResponse } from "next/server";
import { devLog } from "./utils/devLog";

// Truly public routes
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

// Protected patterns
const protectedPatterns = [
  /^\/[^\/]+$/,
  /^\/[^\/]+\/settings$/,
  /^\/[^\/]+\/profile$/,
  /^\/[^\/]+\/create$/,
  /^\/[^\/]+\/secret$/,
  /^\/[^\/]+\/secret\/[^\/]+\/delete$/,
  /^\/[^\/]+\/secret\/[^\/]+\/edit$/,
  /^\/[^\/]+\/secret\/[^\/]+\/share$/,
  /^\/s\/[^\/]+\/[^\/]+$/,
  /^\/s\/[^\/]+\/[^\/]+\/not-found$/,
];

export async function middleware(req: NextRequest) {
  const { auth } = NextAuth(authConfig);
  const session = await auth();
  const { pathname } = req.nextUrl;

  // Skip Next.js internals and public assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Allow public routes
  if (publicRoutes.has(pathname)) {
    return NextResponse.next();
  }

  // 🚨 Redirect '/' (home) if user is not authenticated
  if (pathname === "/") {
    if (!session) {
      devLog(
        "Unauthenticated user trying to access '/' → redirecting to /auth/log-in"
      );
      return NextResponse.redirect(new URL("/auth/log-in", req.url));
    }

    // 🧠 Build personalized redirect path
    const username = session.user?.name?.trim()?.split(" ")[0]?.toLowerCase();

    if (username) {
      devLog(`Authenticated user at '/' → redirecting to /${username}`);
      return NextResponse.redirect(new URL(`/${username}`, req.url));
    }
  }

  // Protect matched routes
  const needsAuth = protectedPatterns.some((pattern) => pattern.test(pathname));
  if (needsAuth && !session) {
    devLog(`Unauthenticated access to ${pathname}`);
    return NextResponse.redirect(new URL("/auth/log-in", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
