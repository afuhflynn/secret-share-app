import { signInSchema, signUpSchema } from "@/zod/zod.schema";
import { User, Secret } from "@prisma/client";
import { z } from "zod";

export interface UserStore {
  user: User | null;
  secrets: Secret[] | null;
  setUser: (user: User | null) => void;
  setSecrets: (secrets: Secret[] | null) => void;

  error: string | null | undefined;
  setError: (error: string | any) => void;
  message: string | null | undefined;
  loading?: boolean;
  setMessage: (message: string | any) => void;
  isGettingUserProfile: boolean;
  isAuthenticated: boolean;
  githubRedirectUrl?: string;
  getUserProfile: () => void;
  signUp: (data: z.infer<typeof signUpSchema>) => void;
  signIn: (data: z.infer<typeof signInSchema>) => void;
  signInGitHub: (provider: string) => void;
  verifyEmail: (code: string) => void;
  verifyEmailToken: (token: string) => void;
  forgotPassword: (email: string) => void;
  resetPassword: (password: string, token: string) => void;
  resendVerificationEmail: (email: string) => void;
}

export interface AppStore {
  prefersTheme: string | "system" | "light" | "dark";
  setPrefersTheme: (value: string | "system" | "light" | "dark") => void;
  currentSecret: Secret | null;
  setCurrentSecret: (secret: Secret) => void;
  fetchCurrentSecret: (sId: string) => void;
}
