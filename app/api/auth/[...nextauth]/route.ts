import NextAuth from "next-auth"

import { authOptions } from "@/lib/auth"

// Function to check if we're in development mode
const isDevelopment = () => {
  return process.env.NODE_ENV === "development"
}

// In development mode, we'll use a simplified version of NextAuth
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

