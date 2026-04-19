import {
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  StyleProp,
} from "react-native";
import React from "react";
import { useTheme } from "../../context/ThemeContext";

interface ThemedTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  title?: boolean;
}

const ThemedText = ({
  style,
  children,
  title = false,
  ...props
}: ThemedTextProps) => {
  const { theme } = useTheme();

  const text = title ? theme.title : theme.text;

  return (
    <Text style={[styles.defaultText, { color: text }, style]} {...props}>
      {children}
    </Text>
  );
};

export default ThemedText;

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 16,
  },
});
