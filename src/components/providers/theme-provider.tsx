"use client";

import Script from "next/script";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
};

const STORAGE_KEY = "theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Inlined and run before hydration (via `beforeInteractive`) so the
 * correct theme class is on <html> before first paint — no flash of
 * the wrong theme. Keep this in sync with the logic in the provider.
 */
const NO_FLASH_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored === 'dark' || (stored !== 'light' && systemPrefersDark);
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();
`;

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    "light",
  );
  // The saved preference is only known after mount. Until then the DOM
  // class set by the no-flash script is left alone, so a saved "light"
  // choice isn't briefly overridden by an OS dark preference.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored: Theme | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    } catch {
      // Storage unavailable — fall back to the system preference.
    }
    setThemeState(stored ?? "system");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const next = theme === "system" ? getSystemTheme() : theme;
    setResolvedTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }, [theme, ready]);

  useEffect(() => {
    if (!ready || theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      const next = getSystemTheme();
      setResolvedTheme(next);
      document.documentElement.classList.toggle("dark", next === "dark");
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [theme, ready]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage can be unavailable (private mode, disabled storage) —
      // theme still applies for this session, it just won't persist.
    }
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <Script
        id="theme-no-flash"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }}
      />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
