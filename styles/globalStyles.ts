import { StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useMemo } from "react";

export const useGlobalStyles = () => {
  const { theme } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.background,
          alignItems: "center",
          justifyContent: "center",
        },
        heading: {
          fontSize: 28,
          fontWeight: "bold",
          color: theme.title,
        },
        title: {
          fontSize: 20,
          fontWeight: "500",
          color: theme.text,
        },
        separator: {
          marginVertical: 30,
          height: 1,
          width: "80%",
          backgroundColor: theme.border,
        },
        input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          borderColor: theme.border,
          color: theme.text,
        },
        button: {
          alignItems: "center",
          backgroundColor: theme.primary,
          padding: 10,
        },
      }),
    [theme],
  );
};
