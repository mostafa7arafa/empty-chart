"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  language: "en" | "ar";
  theme: "light" | "dark";
  announcementDismissed: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  setLanguage: (lang: "en" | "ar") => void;
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  dismissAnnouncement: () => void;
  toggleSearch: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      language: "en",
      theme: "light",
      announcementDismissed: false,
      searchOpen: false,
      mobileMenuOpen: false,
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      dismissAnnouncement: () => set({ announcementDismissed: true }),
      toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
      toggleMobileMenu: () =>
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
      closeMobileMenu: () => set({ mobileMenuOpen: false }),
    }),
    { name: "empty-chart-ui", partialize: (state) => ({ language: state.language, theme: state.theme }) }
  )
);
