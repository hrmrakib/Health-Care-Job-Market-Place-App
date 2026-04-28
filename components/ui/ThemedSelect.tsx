import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface ThemedSelectProps {
  label?: string;
  value: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  onSelect: (value: string) => void;
  icon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
}

const ThemedSelect = ({
  label,
  value,
  options,
  placeholder = "Select an option",
  onSelect,
  icon,
  containerStyle,
  error,
}: ThemedSelectProps) => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

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
          {
            backgroundColor: theme.surface,
            borderColor: error ? theme.warning : "transparent",
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}

        <Text
          style={[
            styles.valueText,
            { color: selectedOption ? theme.text : theme.iconColor },
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>

        <Ionicons
          name="chevron-down-outline"
          size={20}
          color={theme.iconColor}
          style={styles.chevronIcon}
        />
      </TouchableOpacity>

      {error && (
        <Text style={[styles.errorText, { color: theme.warning }]}>
          {error}
        </Text>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.background },
            ]}
          >
            <View
              style={[
                styles.modalHeader,
                { borderBottomColor: theme.border },
              ]}
            >
              <Text style={[styles.modalTitle, { color: theme.title }]}>
                {placeholder}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={theme.title} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    { borderBottomColor: theme.navBackground },
                  ]}
                  onPress={() => {
                    onSelect(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          value === item.value ? theme.primary : theme.text,
                        fontWeight: value === item.value ? "bold" : "normal",
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                  {value === item.value && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={theme.primary}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default ThemedSelect;

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
  iconContainer: {
    marginRight: 10,
  },
  valueText: {
    flex: 1,
    fontSize: 16,
  },
  chevronIcon: {
    marginLeft: 10,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 16,
  },
});
