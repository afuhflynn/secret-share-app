import type { NextAuthConfig } from "next-auth";

export default {
  trustHost: true,
  providers: [], // Providers are configured in lib/auth.ts only
} satisfies NextAuthConfig;
