"use server";

import { signIn } from "@/lib/auth"; // This module should include your server-side logic (e.g., using Prisma)
import { devLog } from "@/utils/devLog";
import { logger } from "@/utils/logger";
import { signInSchema } from "@/zod/zod.schema";
import { z } from "zod";

type SignInData = z.infer<typeof signInSchema>;
// Example server action for Credentials sign-in
export async function credentialsSignInAction(formData: SignInData) {
  const result = signInSchema.safeParse(formData);

  if (!result.success) {
    // Handle validation errors
    return { error: result.error.format() };
  }
  await signIn("credentials", {
    email: result.data.email,
    password: result.data.password,
    redirect: false,
    redirectTo: "/",
  })
    .then((data) => {
      logger.info(`User sign in ${data} `);
      devLog(data);
    })
    .catch((error) => {
      logger.info(`Error signing in user ${error} `);
      devLog(error.message);

      if (error && error.message) {
        throw new Error(
          error.message.replace(
            "Read more at https://errors.authjs.dev#callbackrouteerror",
            ""
          )
        );
      } else {
        throw new Error(
          "Sorry, an unexpected error occurred. Please try again later."
        );
      }
    });
}
