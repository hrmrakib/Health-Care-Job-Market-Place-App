import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import ThemedText from "../ui/ThemedText";

interface StatCardProps {
  icon: React.ReactNode;
  count: number;
  label: string;
  iconBackgroundColor?: string;
}

const StatCard = ({
  icon,
  count,
  label,
  iconBackgroundColor,
}: StatCardProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: iconBackgroundColor
              ? `${iconBackgroundColor}18`
              : `${theme.primary}18`,
          },
        ]}
      >
        {icon}
      </View>
      <ThemedText title style={styles.count}>
        {count}
      </ThemedText>
      <ThemedText style={styles.label}>{label}</ThemedText>
    </View>
  );
};

export default StatCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 14,
    shadowColor: "#0000008b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  count: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    opacity: 0.7,
  },
});
