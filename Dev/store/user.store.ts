import { UserStore } from "@/types/TYPES";
import { privateAxios } from "@/utils/axios.config";
import { create } from "zustand";
import { User } from "@prisma/client";
import axios from "axios";
import { credentialsSignInAction } from "@/actions/credentials-signin";
import { devLog } from "@/utils/devLog";

export const controller = new AbortController(); // Controlling and aborting signals

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  error: null,
  loading: false,
  isAuthenticated: false,
  isGettingUserProfile: false,
  githubRedirectUrl: "",

  setError: (error) => {
    set({ error });
  },
  message: null,
  setMessage(message) {
    set({ message });
  },
  setUser: (user) => {
    set({ user });
  },
  getUserProfile: async () => {
    set({ isGettingUserProfile: true });
    try {
      const response = await privateAxios.get<{ user: User; message: string }>(
        "/api/v1/user/get-user-profile"
      );
      set({
        user: response.data.user as User,
        message: response.data.message as string,
        isAuthenticated: true,
      });
      // controller.abort("Fetch complete");
    } catch (error: Error | any) {
      set({ error: "" });
      if (error.response.data) set({ error: error.response.data.error });
      else
        set({
          error:
            "Sorry, an unexpected error occurred. Can not get user info at the moment.",
        });
      devLog(error);
    } finally {
      set({ isGettingUserProfile: false });
    }
  },
  signUp: async (data) => {
    set({ loading: true, message: null, error: null });
    try {
      const result = await axios.post<{ message: string }>(
        "/api/v1/user/sign-up",
        {
          email: data.email,
          password: data.password,
          name: data.name,
        }
      );
      set({ message: result.data.message });
    } catch (error: Error | any) {
      if (error.response.data) set({ error: error.response.data.message });
      else
        set({ error: "Sorry, an unexpected error occurred. Try again later." });
    } finally {
      set({ loading: false });
    }
  },
  signIn: async (data) => {
    set({ loading: true, message: null, error: null });
    try {
      await credentialsSignInAction(data);
      set({ message: "Login successful" });
    } catch (error: Error | any) {
      if (error.message)
        set({
          error: error.message.replace(
            "Read more at https://errors.authjs.dev#callbackrouteerror",
            ""
          ),
        });
      else
        set({ error: "Sorry, an unexpected error occurred. Try again later." });
    } finally {
      set({ loading: false });
    }
  },
  signInGitHub: async (data) => {
    set({ loading: true, message: null, error: null });
    try {
      const result = await axios.post<{ message: string; url: string }>(
        "/api/v1/user/github-signin",
        {
          provider: data,
        }
      );
      set({
        message: result.data.message,
        githubRedirectUrl: result.data.url,
        isAuthenticated: true,
      });
    } catch (error: Error | any) {
      if (error.response.data) set({ error: error.response.data.message });
      else
        set({ error: "Sorry, an unexpected error occurred. Try again later." });
    } finally {
      set({ loading: false });
    }
  },
  verifyEmail: async (code) => {
    set({ loading: true, message: null, error: null });
    try {
      const result = await axios.post<{ message: string }>(
        "/api/v1/user/verify-email",
        {
          code,
        }
      );
      set({ message: result.data.message });
    } catch (error: Error | any) {
      if (error.response.data) set({ error: error.response.data.message });
      else if (error.message) set({ error: error.message });
      else
        set({ error: "Sorry, an unexpected error occurred. Try again later." });
    } finally {
      set({ loading: false });
    }
  },
  verifyEmailToken: async (token) => {
    set({ loading: true, message: null, error: null });
    try {
      const result = await axios.post<{ message: string }>(
        "/api/v1/user/verify-email/token",
        {
          token,
        }
      );
      set({ message: result.data.message });
    } catch (error: Error | any) {
      if (error.response.data) set({ error: error.response.data.message });
      else
        set({ error: "Sorry, an unexpected error occurred. Try again later." });
    } finally {
      set({ loading: false });
    }
  },
  forgotPassword: async (email) => {
    set({ loading: true, message: null, error: null });
    try {
      const result = await axios.post<{ message: string }>(
        "/api/v1/user/forgot-password",
        {
          email,
        }
      );
      set({ message: result.data.message });
    } catch (error: Error | any) {
      if (error.response.data) set({ error: error.response.data.message });
      else
        set({ error: "Sorry, an unexpected error occurred. Try again later." });
    } finally {
      set({ loading: false });
    }
  },
  resetPassword: async (password, token) => {
    set({ loading: true, message: null, error: null });
    try {
      const result = await axios.put<{ message: string }>(
        "/api/v1/user/reset-password",
        {
          password,
          token,
        }
      );
      set({ message: result.data.message });
    } catch (error: Error | any) {
      if (error.response.data) set({ error: error.response.data.message });
      else
        set({ error: "Sorry, an unexpected error occurred. Try again later." });
    } finally {
      set({ loading: false });
    }
  },
  resendVerificationEmail: async (email) => {
    try {
      const result = await axios.put<{ message: string }>(
        "/api/v1/user/resend-verification-email",
        {
          email,
        }
      );
      set({ message: result.data.message });
    } catch (error: Error | any) {
      if (error.response.data) set({ error: error.response.data.message });
      else
        set({ error: "Sorry, an unexpected error occurred. Try again later." });
    }
  },
}));
