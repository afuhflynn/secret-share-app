"use server";

import { signIn } from "@/lib/auth";

export async function githubSignInAction() {
  await signIn("github", { redirect: true, redirectTo: "/" });
}
