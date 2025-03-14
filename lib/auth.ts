import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { MockAdapter } from "./mock-adapter";

// Function to check if we're in development mode
const isDevelopment = () => {
  return process.env.NODE_ENV === "development";
};

export const authOptions: NextAuthOptions = {
  adapter: isDevelopment() ? MockAdapter() : undefined, // Use mock adapter in development
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/log-in",
    verifyRequest: "/auth/verify-email",
    newUser: "/dashboard",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST || "",
        port: Number(process.env.EMAIL_SERVER_PORT) || 587,
        auth: {
          user: process.env.EMAIL_SERVER_USER || "",
          pass: process.env.EMAIL_SERVER_PASSWORD || "",
        },
      },
      from: process.env.EMAIL_FROM || "noreply@secretshare.com",
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (isDevelopment()) {
        // In development, just return the token with some mock data
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      // This part will only run in production
      try {
        // In a real app, we would fetch the user from the database
        // For now, just return the token
        if (user) {
          token.id = user?.id;
        }
        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },
  },
};
