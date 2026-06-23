"use client";

import { useThemeStore } from "@/store/themeStore";

export default function ThemeButton() {
  const { theme, toggle } = useThemeStore();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggle}
      title={isLight ? "Camisa Azul (Modo Escuro)" : "Camisa Amarela (Modo Claro)"}
      className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
    >
      {isLight ? (
        /* Moon — switch to dark */
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      ) : (
        /* Sun — switch to light */
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
      )}
    </button>
  );
}
