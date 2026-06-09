"use client";

import { createContext, useContext, useSyncExternalStore, useCallback } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: "light", toggleTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

function getThemeSnapshot(): Theme {
  return (localStorage.getItem("emptychart-theme") as Theme) || "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(callback: () => void) {
  const handler = () => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.getItem("emptychart-theme") === "dark"
    );
    callback();
  };
  window.addEventListener("theme-change", handler);
  // Sync class on mount
  document.documentElement.classList.toggle(
    "dark",
    localStorage.getItem("emptychart-theme") === "dark"
  );
  return () => window.removeEventListener("theme-change", handler);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const current = localStorage.getItem("emptychart-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    localStorage.setItem("emptychart-theme", next);
    window.dispatchEvent(new Event("theme-change"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
