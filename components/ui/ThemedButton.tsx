import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: "primary" | "secondary" | "warning";
}

const ThemedButton = ({
  title,
  style,
  textStyle,
  variant = "primary",
  ...props
}: ThemedButtonProps) => {
  const { theme } = useTheme();

  // Determine button background based on variant
  const getBackgroundColor = () => {
    switch (variant) {
      case "primary":
        return theme.primary; // The Blue
      case "warning":
        return theme.warning; // The Red/Pink
      case "secondary":
        return theme.surface; // The Elevated Grey
      default:
        return theme.primary;
    }
  };

  // Determine text color (secondary variant needs theme text color)
  const getTextColor = () => {
    if (variant === "secondary") return theme.text;
    return "#fff"; // Primary and Warning usually look best with white text
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, { backgroundColor: getBackgroundColor() }, style]}
      {...props}
    >
      <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
