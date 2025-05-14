import { dummyNoteItems } from "@/lib/constants";
import { AppStore } from "@/types/TYPES";
import { create } from "zustand";

export const useAppStore = create<AppStore>((set) => ({
  prefersTheme: "system",
  setPrefersTheme(value) {
    set({ prefersTheme: value });
  },
  currentSecret: null,
  setCurrentSecret(secret) {
    set({ currentSecret: secret });
  },
  fetchCurrentSecret(noteId) {
    const note = dummyNoteItems.find((item) => item.id === noteId);
    // set({ currentNote: note });
  },
}));
