import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface ThemedInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

const ThemedInput = ({
  label,
  error,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  ...props
}: ThemedInputProps) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  // Handle focus highlights
  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label using the title color */}
      {label && (
        <Text style={[styles.label, { color: theme.title }]}>{label}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.surface,
            color: theme.text,
            borderColor: error
              ? theme.warning
              : isFocused
                ? theme.primary
                : theme.border,
          },
          inputStyle,
        ]}
        placeholderTextColor={theme.iconColor}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />

      {/* Error message using the warning color */}
      {error && (
        <Text style={[styles.errorText, { color: theme.warning }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default ThemedInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
