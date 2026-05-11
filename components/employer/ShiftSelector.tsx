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
import ThemedInput from "../ui/ThemedInput";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface ShiftSelectorProps {
  label?: string;
  shiftType: "Day" | "Night";
  onShiftTypeChange: (type: "Day" | "Night") => void;
  timing: string;
  onTimingChange: (timing: string) => void;
  selectedDays: string[];
  onToggleDay: (day: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ShiftSelector = ({
  label,
  shiftType,
  onShiftTypeChange,
  timing,
  onTimingChange,
  selectedDays,
  onToggleDay,
  containerStyle,
}: ShiftSelectorProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: theme.title }]}>{label}</Text>
      )}

      <View
        style={[
          styles.card,
          styles.cardShadow,
          { backgroundColor: theme.surface },
        ]}
      >
        {/* Shift Details header - collapsible look */}
        <View style={styles.headerRow}>
          <Ionicons
            name="time-outline"
            size={18}
            color={theme.iconColor}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            Shift details
          </Text>
          <Ionicons
            name="chevron-up-outline"
            size={18}
            color={theme.iconColor}
          />
        </View>

        {/* Day/Night Toggle */}
        <View style={styles.toggleSection}>
          <TouchableOpacity
            onPress={() => onShiftTypeChange("Day")}
            style={styles.toggleOption}
          >
            <Text
              style={[
                styles.toggleText,
                {
                  color:
                    shiftType === "Day" ? theme.text : theme.iconColor,
                  fontWeight: shiftType === "Day" ? "600" : "400",
                },
              ]}
            >
              Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onShiftTypeChange("Night")}
            style={styles.toggleOption}
          >
            <Text
              style={[
                styles.toggleText,
                {
                  color:
                    shiftType === "Night" ? theme.primary : theme.iconColor,
                  fontWeight: shiftType === "Night" ? "600" : "400",
                },
              ]}
            >
              Night
            </Text>
          </TouchableOpacity>
        </View>

        {/* Timing Input */}
        <ThemedInput
          placeholder="Enter timing e.g. 8.00 AM - 6.00 PM"
          value={timing}
          onChangeText={onTimingChange}
          containerStyle={{ marginBottom: 12 }}
        />

        {/* Days of Week */}
        <View style={styles.daysRow}>
          {DAYS.map((day) => {
            const isSelected = selectedDays.includes(day);
            return (
              <TouchableOpacity
                key={day}
                onPress={() => onToggleDay(day)}
                style={styles.dayButton}
              >
                <Text
                  style={[
                    styles.dayText,
                    {
                      color: isSelected ? theme.primary : theme.iconColor,
                      fontWeight: isSelected ? "700" : "400",
                    },
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default ShiftSelector;

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
  card: {
    borderRadius: 10,
    padding: 15,
  },
  cardShadow: {
    shadowColor: "#0000008b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  headerText: {
    flex: 1,
    fontSize: 15,
  },
  toggleSection: {
    marginBottom: 12,
  },
  toggleOption: {
    paddingVertical: 4,
  },
  toggleText: {
    fontSize: 15,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayButton: {
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  dayText: {
    fontSize: 14,
  },
});
