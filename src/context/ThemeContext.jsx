import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "srk-portfolio-theme";

const ThemeContext = createContext(null);

/**
 * Wraps the app, owns the single source of truth for light/dark theme,
 * and keeps it in sync with localStorage.
 */
export function ThemeProvider({ children }) {
  // Lazy initializer: read the saved preference (if any) on first render only.
  const [theme, setTheme] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      // localStorage can throw in private-browsing / restricted contexts — fall back silently.
    }
    return "light";
  });

  // useEffect #1 (of the app's required two): persist the theme to localStorage,
  // and reflect it on <html data-theme="..."> so CSS variables can react to it.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage failures — theme still works for the current session.
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }
  return ctx;
}
