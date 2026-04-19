import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientButtonProps {
  title?: string;
  onPress?: () => void;
  colors?: readonly [string, string, ...string[]];
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title = "Go",
  onPress,
  colors = ["#004A8F", "#008290"],
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, { borderRadius: 8, overflow: "hidden" }]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.button, style]}
      >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 80,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "semibold",
  },
});

export default GradientButton;
