import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";
import { NextRequest, NextResponse } from "next/server";
import { devLog } from "./utils/devLog";

// 1) Public‐route patterns (static + dynamic)
const publicPatterns = [
  /^\/$/, // your landing page
  /^\/terms-of-service$/,
  /^\/privacy-policy$/,
  /^\/pricing$/,
  /^\/about$/,
  /^\/contact$/,
  /^\/features$/,
  /^\/faqs$/,
  /^\/blog$/, // blog index
  /^\/blog\/[^\/]+$/, // blog posts
];

// 2) Protected‑route patterns (same as yours)
const protectedPatterns = [
  /^\/[^\/]+\/settings$/,
  /^\/[^\/]+\/profile$/,
  /^\/[^\/]+\/create$/,
  /^\/[^\/]+\/secret$/,
  /^\/[^\/]+\/secret\/[^\/]+\/delete$/,
  /^\/[^\/]+\/secret\/[^\/]+\/edit$/,
  /^\/[^\/]+\/secret\/[^\/]+\/share$/,
  /^\/s\/[^\/]+\/[^\/]+$/,
  /^\/s\/[^\/]+\/[^\/]+\/not-found$/,
  // note: we removed the “/^\/[^\/]+$/” single‑segment catch‑all here
];

export async function middleware(req: NextRequest) {
  const { auth } = NextAuth(authConfig);
  const session = await auth();
  const { pathname } = req.nextUrl;

  // → Skip Next.js internals, auth API, assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // → Allow any public page
  if (publicPatterns.some((rx) => rx.test(pathname))) {
    // Special case: authenticated users on `/` should get sent to their profile
    if (pathname === "/" && session) {
      const username = session.user?.name?.trim()?.split(" ")[0]?.toLowerCase();
      if (username) {
        devLog(`Authenticated hit "/" → redirect → /${username}`);
        return NextResponse.redirect(new URL(`/${username}`, req.url));
      }
    }
    return NextResponse.next();
  }

  // → Enforce login on protected patterns
  if (protectedPatterns.some((rx) => rx.test(pathname))) {
    if (!session) {
      devLog(`Unauthenticated access to ${pathname}`);
      return NextResponse.redirect(new URL("/auth/log-in", req.url));
    }
  }

  // → Finally, catch anything else that’s a single segment (your user profiles)
  //    (e.g. `/someuser`) and enforce login there too:
  if (/^\/[^\/]+$/.test(pathname) && !session) {
    devLog(`Unauthenticated access to profile ${pathname}`);
    return NextResponse.redirect(new URL("/auth/log-in", req.url));
  }

  // → Let everything else through
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
