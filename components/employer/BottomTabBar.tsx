import React from "react";
import { StyleSheet, View, TouchableOpacity, Platform } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import ThemedText from "../ui/ThemedText";

interface TabItem {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconFocused: keyof typeof Ionicons.glyphMap;
}

const tabs: TabItem[] = [
  {
    name: "home",
    label: "Home",
    icon: "briefcase-outline",
    iconFocused: "briefcase",
  },
  {
    name: "jobs",
    label: "Jobs",
    icon: "document-text-outline",
    iconFocused: "document-text",
  },
  {
    name: "payments",
    label: "Payments",
    icon: "card-outline",
    iconFocused: "card",
  },
  {
    name: "profile-tab",
    label: "Profile",
    icon: "person-outline",
    iconFocused: "person",
  },
];

interface BottomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const tab = tabs[index];

        if (!tab) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconWrapper,
                isFocused && {
                  backgroundColor: `${theme.primary}15`,
                },
              ]}
            >
              <Ionicons
                name={isFocused ? tab.iconFocused : tab.icon}
                size={24}
                color={isFocused ? theme.primary : theme.iconColor}
              />
            </View>
            <ThemedText
              style={[
                styles.label,
                {
                  color: isFocused ? theme.primary : theme.iconColor,
                  fontWeight: isFocused ? "600" : "400",
                },
              ]}
            >
              {tab.label}
            </ThemedText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  iconWrapper: {
    width: 40,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 11,
  },
});
