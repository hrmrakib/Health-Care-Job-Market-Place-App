import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
  percentage: number;
}

const ProgressBar = ({ step, totalSteps, percentage }: ProgressBarProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        <Text style={[styles.stepText, { color: theme.text }]}>
          Step {step} of {totalSteps}
        </Text>
        <Text style={[styles.percentageText, { color: theme.primary }]}>
          {percentage}%
        </Text>
      </View>
      <View style={[styles.track, { backgroundColor: theme.navBackground }]}>
        <View
          style={[
            styles.fill,
            { backgroundColor: theme.primary, width: `${percentage}%` },
          ]}
        />
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 24,
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    fontWeight: "500",
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "600",
  },
  track: {
    height: 6,
    borderRadius: 3,
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 3,
  },
});
