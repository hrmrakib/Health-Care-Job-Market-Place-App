import { StyleSheet, Text, View, ViewStyle, StyleProp } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface ThemedViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
}

const ThemedView = ({
  style,
  children,
  variant,
  ...props
}: ThemedViewProps) => {
  const { theme } = useTheme();

  const background = variant === "primary" ? theme.background : theme.surface;

  return (
    <View
      style={[styles.defaultLayout, { backgroundColor: background }, style]}
      {...props}
    >
      {children}
    </View>
  );
};

export default ThemedView;

const styles = StyleSheet.create({
  defaultLayout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
