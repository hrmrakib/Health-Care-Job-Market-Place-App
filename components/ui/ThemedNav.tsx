import React from "react";
import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

interface ThemedNavProps {
  title?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ThemedNav = ({
  title,
  leftComponent,
  rightComponent,
  style,
}: ThemedNavProps) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.navBackground,
          borderBottomColor: theme.border,
        },
        style,
      ]}
    >
      <SafeAreaView>
        <View style={styles.content}>
          {/* Left Slot (e.g., Back Button) */}
          <View style={styles.sideContainer}>{leftComponent}</View>

          {/* Center Title */}
          <View style={styles.titleContainer}>
            {title ? (
              <Text
                numberOfLines={1}
                style={[styles.title, { color: theme.title }]}
              >
                {title}
              </Text>
            ) : null}
          </View>

          {/* Right Slot (e.g., Settings/Profile Icon) */}
          <View style={[styles.sideContainer, styles.alignRight]}>
            {rightComponent}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ThemedNav;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "100%",
  },
  content: {
    height: 56, // Standard mobile header height
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  sideContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titleContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  alignRight: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
