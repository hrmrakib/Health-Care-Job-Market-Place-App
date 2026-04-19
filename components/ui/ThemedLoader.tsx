import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface ThemedLoaderProps extends ActivityIndicatorProps {
  containerStyle?: StyleProp<ViewStyle>;
  /** If true, the loader will fill the screen/container and center itself */
  fullScreen?: boolean;
}

const ThemedLoader = ({
  size = "small",
  containerStyle,
  fullScreen = false,
  ...props
}: ThemedLoaderProps) => {
  const { theme } = useTheme();

  return (
    <View style={[fullScreen && styles.fullScreen, containerStyle]}>
      <ActivityIndicator
        size={size}
        color={theme.primary} // Uses your #0074BE blue
        {...props}
      />
    </View>
  );
};

export default ThemedLoader;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
