import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface DatePickerFieldProps {
  label?: string;
  value: string;
  placeholder?: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const DatePickerField = ({
  label,
  value,
  placeholder = "Select date",
  onPress,
  containerStyle,
}: DatePickerFieldProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: theme.title }]}>{label}</Text>
      )}

      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.inputWrapper,
          styles.inputShadow,
          { backgroundColor: theme.surface },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.valueText,
            { color: value ? theme.text : theme.iconColor },
          ]}
        >
          {value || placeholder}
        </Text>
        <Ionicons
          name="calendar-outline"
          size={20}
          color={theme.iconColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DatePickerField;

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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  inputShadow: {
    shadowColor: "#0000008b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  valueText: {
    flex: 1,
    fontSize: 16,
  },
});
