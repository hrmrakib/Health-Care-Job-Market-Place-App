import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import ThemedText from "../ui/ThemedText";
import { useTheme } from "../../context/ThemeContext";

interface SectionTitleProps {
  title: string;
  actionText?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
}

const SectionTitle = ({
  title,
  actionText,
  onAction,
  style,
}: SectionTitleProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <ThemedText title style={styles.title}>
        {title}
      </ThemedText>
      {actionText && (
        <TouchableOpacity onPress={onAction}>
          <ThemedText style={[styles.action, { color: theme.primary }]}>
            {actionText}
          </ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  action: {
    fontSize: 14,
    fontWeight: "500",
  },
});
