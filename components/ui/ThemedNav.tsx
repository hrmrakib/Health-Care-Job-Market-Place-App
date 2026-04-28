import React from "react";
import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface ThemedNavProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
}

const ThemedNav = ({ title, style }: ThemedNavProps) => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: "transparent",
        },
        style,
      ]}
    >
      <View style={styles.content}>
        {/* Left Slot - Back Button */}
        <View style={styles.sideContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ padding: 8 }}
          >
            <Ionicons name='arrow-back' size={24} color={theme.title} />
          </TouchableOpacity>
        </View>

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
      </View>
    </View>
  );
};

export default ThemedNav;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  content: {
    flexDirection: "row",
    paddingBottom: 8,
    alignItems: "center",
  },
  sideContainer: {
    marginRight: 16,
  },
  titleContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
