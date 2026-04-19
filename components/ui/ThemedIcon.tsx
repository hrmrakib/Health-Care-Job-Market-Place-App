import React from "react";
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface ThemedIconProps {
  // Pass the icon component itself (e.g., Ionicons, Lucide)
  IconComponent: any;
  name: string;
  size?: number;
  color?: string; // Manual override
  active?: boolean; // Toggles between iconColor and iconColorFocused
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

const ThemedIcon = ({
  IconComponent,
  name,
  size = 24,
  color,
  active = false,
  onPress,
  style,
}: ThemedIconProps) => {
  const { theme } = useTheme();

  // Logic: 1. Manual Color > 2. Focused Color > 3. Default Icon Color
  const finalColor =
    color || (active ? theme.iconColorFocused : theme.iconColor);

  const IconElement = (
    <IconComponent name={name} size={size} color={finalColor} style={style} />
  );

  // If onPress is provided, wrap it in a TouchableOpacity for interaction
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.6}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Makes it easier to tap
      >
        {IconElement}
      </TouchableOpacity>
    );
  }

  return IconElement;
};

export default ThemedIcon;
