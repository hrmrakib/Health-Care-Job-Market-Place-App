import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import ThemedText from "../ui/ThemedText";

interface FavoriteEmployeeRowProps {
  name: string;
  role: string;
  avatarUri?: string;
  onMessage?: () => void;
  onCall?: () => void;
  onDelete?: () => void;
}

const FavoriteEmployeeRow = ({
  name,
  role,
  avatarUri,
  onMessage,
  onCall,
  onDelete,
}: FavoriteEmployeeRowProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.row, { borderBottomColor: `${theme.iconColor}20` }]}>
      {/* Avatar */}
      <View
        style={[styles.avatar, { backgroundColor: theme.navBackground }]}
      >
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
        ) : (
          <Ionicons name="person" size={24} color={theme.iconColor} />
        )}
      </View>

      {/* Name & Role */}
      <View style={styles.infoSection}>
        <ThemedText title style={styles.name}>
          {name}
        </ThemedText>
        <ThemedText style={[styles.role, { color: theme.primary }]}>
          {role}
        </ThemedText>
      </View>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          onPress={onMessage}
          style={[styles.iconBtn, { backgroundColor: `${theme.primary}12` }]}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={18}
            color={theme.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onCall}
          style={[styles.iconBtn, { backgroundColor: `${theme.primary}12` }]}
        >
          <Ionicons name="call-outline" size={18} color={theme.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.iconBtn, { backgroundColor: `${theme.error}12` }]}
        >
          <Ionicons name="trash-outline" size={18} color={theme.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FavoriteEmployeeRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  infoSection: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
  },
  role: {
    fontSize: 13,
    fontWeight: "500",
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
