import { compare } from "bcryptjs";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
// import { User } from "@prisma/client";
import NextAuth, { CredentialsSignin } from "next-auth";
import authConfig from "./auth.config";
// import { v4 as uuid } from "uuid";

import { CustomPrismaAdapter } from "@/lib/custom-prisma-adapter";
import { logger } from "@/utils/logger";
import { sendNotificationEmail } from "@/utils/Emails/send.emails";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "@/utils/Load_Envs";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid email or password";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: CustomPrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        // Send warning email for failed login attempt using sendNotificationEmail function
        if (!user) {
          // add log using logger
          logger.error(`A failed login attempt was detected email: ${email}`);
          await sendNotificationEmail(
            `A failed login attempt was detected email: ${email}`,
            email,
            "User",
            new Date(Date.now()).toLocaleDateString(),
            "User",
            {
              "X-Category": "Failed Login Attempt",
            }
          );
          throw new InvalidLoginError().code;
        }

        const isValidPassword = await compare(
          password as string,
          user.password as string
        );
        if (!isValidPassword) {
          // add log using logger
          logger.error(
            `A failed login attempt was detected for user with email: ${email}`
          );

          await sendNotificationEmail(
            `A failed login attempt was detected for user with email: ${email}`,
            email,
            "User",
            new Date(Date.now()).toLocaleDateString(),
            "User",
            {
              "X-Category": "Failed Login Attempt",
            }
          );
          throw new InvalidLoginError().code;
        }
        // add log using logger
        logger.error(
          `User ${user.email} recently authorized a sign in into their account`
        );

        await sendNotificationEmail(
          `Your email: ${user.email} recently authorized a sign in into your account`,
          user?.email as string,
          user?.name as string,
          new Date(Date.now()).toLocaleDateString(),
          user?.name as string,
          {
            "X-Category": "Notification Email",
          }
        );

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async redirect() {
      return "/"; // Always redirect to home
    },
    async session({ session, token }) {
      // attach extra token data to session if desired
      session.user.id = token.sub as string;

      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return (
          profile?.email_verified === true &&
          profile?.email?.endsWith("@example.com") === true
        );
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
  debug: true,
});
