import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import ThemedText from "../ui/ThemedText";

interface TagBadgeProps {
  label: string;
  variant?: "outlined" | "filled" | "status";
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const TagBadge = ({
  label,
  variant = "outlined",
  color,
  style,
}: TagBadgeProps) => {
  const { theme } = useTheme();

  const getStyles = () => {
    switch (variant) {
      case "filled":
        return {
          backgroundColor: color || theme.primary,
          borderColor: "transparent",
          textColor: "#fff",
        };
      case "status":
        return {
          backgroundColor: color ? `${color}18` : `${theme.success}18`,
          borderColor: "transparent",
          textColor: color || theme.success,
        };
      default:
        return {
          backgroundColor: "transparent",
          borderColor: color || theme.iconColor,
          textColor: color || theme.text,
        };
    }
  };

  const badgeStyles = getStyles();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: badgeStyles.backgroundColor,
          borderColor: badgeStyles.borderColor,
          borderWidth: variant === "outlined" ? 1 : 0,
        },
        style,
      ]}
    >
      <ThemedText
        style={[styles.text, { color: badgeStyles.textColor }]}
      >
        {label}
      </ThemedText>
    </View>
  );
};

export default TagBadge;

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  text: {
    fontSize: 13,
    fontWeight: "500",
  },
});
