// theme/provider.tsx

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  PropsWithChildren,
} from "react";

import { darkTheme } from "./themes/dark";

export type ThemeMode = "dark";

interface ThemeContextType {
  mode: ThemeMode;

  theme: typeof darkTheme;

  setMode: (mode: ThemeMode) => void;

  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>("dark");

  const theme = useMemo(() => {
    switch (mode) {
      case "dark":
      default:
        return darkTheme;
    }
  }, [mode]);

  const toggleTheme = () => {
    // Placeholder for future light theme support.
    setMode("dark");
  };

  const value = useMemo(
    () => ({
      mode,
      theme,
      setMode,
      toggleTheme,
    }),
    [mode, theme]
  );

  return (
    <ThemeContext.Provider value={value} >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useThemeContext must be used inside ThemeProvider"
    );
  }

  return context;
}