"use server";

import { signOut } from "@/lib/auth"; // This module should include your server-side logic (e.g., using Prisma)

// Example server action for Credentials sign-in
export async function signOutAction() {
  await signOut({
    redirect: false,
    redirectTo: "/",
  });
}
