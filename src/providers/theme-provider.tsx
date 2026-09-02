"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "cineverse-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always starts at "dark" so the client's first render matches the
  // server-rendered markup exactly. The inline head script sets the real
  // theme on <html> before paint (avoiding FOUC), but React's own state
  // here can only pick up that value after mount without causing a
  // hydration mismatch — hence the sync in the effect below.
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    // One-time sync from the DOM attribute the pre-hydration head script set
    // (see the inline theme-init script in layout.tsx). This value can't be
    // known during SSR, so a single extra render here is unavoidable.
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from an external DOM value written before hydration, not derivable from props/state
      setThemeState(attr);
    }
  }, []);

  const applyTheme = useCallback((next: Theme) => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.setAttribute("data-theme", next);
    window.setTimeout(() => root.classList.remove("theme-transition"), 250);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable (private mode, disabled storage) — theme
      // simply won't persist across reloads.
    }
  }, []);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      applyTheme(next);
    },
    [applyTheme]
  );

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, [applyTheme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
