import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface InviteEmployeeSelectProps {
  label?: string;
  selectedEmployees: string[];
  allEmployees: string[];
  onToggleEmployee: (name: string) => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const InviteEmployeeSelect = ({
  label,
  selectedEmployees,
  allEmployees,
  onToggleEmployee,
  placeholder = "Search employee",
  containerStyle,
}: InviteEmployeeSelectProps) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredEmployees = allEmployees.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

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
        onPress={() => setIsOpen(!isOpen)}
      >
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          value={search}
          onChangeText={setSearch}
          placeholder={placeholder}
          placeholderTextColor={theme.iconColor}
          onFocus={() => setIsOpen(true)}
        />
        <Ionicons
          name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={20}
          color={theme.iconColor}
        />
      </TouchableOpacity>

      {isOpen && (
        <View
          style={[
            styles.dropdown,
            styles.inputShadow,
            { backgroundColor: theme.surface },
          ]}
        >
          {filteredEmployees.map((name) => {
            const isSelected = selectedEmployees.includes(name);
            return (
              <TouchableOpacity
                key={name}
                style={styles.option}
                onPress={() => onToggleEmployee(name)}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: isSelected ? theme.primary : theme.text,
                      fontWeight: isSelected ? "600" : "400",
                    },
                  ]}
                >
                  {name}
                </Text>
                {isSelected && (
                  <Ionicons
                    name="checkmark"
                    size={18}
                    color={theme.primary}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default InviteEmployeeSelect;

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
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: "100%",
  },
  dropdown: {
    borderRadius: 10,
    marginTop: 4,
    paddingVertical: 4,
    maxHeight: 200,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 15,
  },
});
