import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  theme: "dark" | "light";
  toggle: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "dark",
      toggle: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        set({ theme: next });
      },
    }),
    { name: "dev-squad-theme" }
  )
);