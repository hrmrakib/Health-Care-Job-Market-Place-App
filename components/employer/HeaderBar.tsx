import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import ThemedText from "../ui/ThemedText";

interface HeaderBarProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  rightActions?: {
    heart?: boolean;
    message?: boolean;
    messageCount?: number;
    notification?: boolean;
    notificationCount?: number;
  };
  rightElement?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const HeaderBar = ({
  title,
  subtitle,
  showBackButton = false,
  onBack,
  rightActions,
  rightElement,
  style,
}: HeaderBarProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.title} />
          </TouchableOpacity>
        )}
        <View>
          <ThemedText title style={styles.title}>
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
          )}
        </View>
      </View>

      <View style={styles.rightSection}>
        {rightActions?.heart && (
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={22} color={theme.iconColor} />
          </TouchableOpacity>
        )}
        {rightActions?.message && (
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={22}
              color={theme.iconColor}
            />
            {(rightActions.messageCount ?? 0) > 0 && (
              <View style={[styles.badge, { backgroundColor: theme.primary }]}>
                <ThemedText style={styles.badgeText}>
                  {rightActions.messageCount}
                </ThemedText>
              </View>
            )}
          </TouchableOpacity>
        )}
        {rightActions?.notification && (
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={theme.iconColor}
            />
            {(rightActions.notificationCount ?? 0) > 0 && (
              <View style={[styles.badge, { backgroundColor: theme.error }]}>
                <ThemedText style={styles.badgeText}>
                  {rightActions.notificationCount}
                </ThemedText>
              </View>
            )}
          </TouchableOpacity>
        )}
        {rightElement}
      </View>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
    opacity: 0.7,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    padding: 6,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
