import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

type theme = typeof Colors.light;

type ThemeContextType = {
  theme: theme;
  scheme: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const scheme = useColorScheme() ?? "light";

  const theme = Colors[scheme];

  return (
    <ThemeContext.Provider value={{ theme, scheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
