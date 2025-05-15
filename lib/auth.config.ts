import type { NextAuthConfig } from "next-auth";

export default {
  trustHost: true,
  providers: [], // Providers are configured in auth.ts
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      return true; // Let the middleware handle authorization
    },
  },
} satisfies NextAuthConfig;
