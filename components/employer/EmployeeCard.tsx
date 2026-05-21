import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import ThemedText from "../ui/ThemedText";
import TagBadge from "./TagBadge";

interface EmployeeCardProps {
  name: string;
  role: string;
  status: string;
  statusColor?: string;
  rating: number;
  location: string;
  salary: string;
  shift: string;
  shiftType: string;
  date: string;
  timeRemaining?: string;
  avatarUri?: string;
  isFavorited?: boolean;
  onViewDetails?: () => void;
  onFavorite?: () => void;
  onMessage?: () => void;
}

const EmployeeCard = ({
  name,
  role,
  status,
  statusColor,
  rating,
  location,
  salary,
  shift,
  shiftType,
  date,
  timeRemaining,
  avatarUri,
  isFavorited = false,
  onViewDetails,
  onFavorite,
  onMessage,
}: EmployeeCardProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      {/* Top Section */}
      <View style={styles.topRow}>
        <View style={styles.profileSection}>
          <View
            style={[styles.avatar, { backgroundColor: theme.navBackground }]}
          >
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            ) : (
              <Ionicons name='person' size={28} color={theme.iconColor} />
            )}
          </View>
          <View style={styles.nameSection}>
            <ThemedText title style={styles.name}>
              {name}
            </ThemedText>
            <View style={styles.roleRow}>
              <ThemedText style={[styles.roleText, { color: theme.primary }]}>
                {role}
              </ThemedText>
              <TagBadge
                label={status}
                variant='status'
                color={statusColor || theme.success}
                style={styles.statusBadge}
              />
            </View>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name='star' size={14} color='#F4B740' />
          <ThemedText style={styles.ratingText}>{rating}</ThemedText>
        </View>
      </View>

      {/* Details */}
      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <Ionicons name='location-outline' size={16} color={theme.iconColor} />
          <ThemedText style={styles.detailText}>{location}</ThemedText>
        </View>
        <View style={styles.detailRow}>
          <ThemedText style={[styles.dollarSign, { color: theme.success }]}>
            $
          </ThemedText>
          <ThemedText style={[styles.salaryText, { color: theme.success }]}>
            {salary}
          </ThemedText>
        </View>
        <View
          style={[
            styles.detailRow,
            {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={styles.detailRow}>
            <Ionicons name='moon-outline' size={16} color={theme.iconColor} />
            <ThemedText style={styles.detailText}>
              {shift} • {shiftType}
            </ThemedText>
          </View>
          <ThemedText style={[styles.dateText, { marginLeft: 12 }]}>
            {date}
          </ThemedText>
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomRow}>
        {timeRemaining && (
          <View style={styles.timeRow}>
            <Ionicons name='time-outline' size={14} color={theme.primary} />
            <ThemedText style={[styles.timeText, { color: theme.primary }]}>
              {timeRemaining}
            </ThemedText>
          </View>
        )}
        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={onFavorite} style={styles.actionIcon}>
            <Ionicons
              name={isFavorited ? "heart" : "heart-outline"}
              size={20}
              color={isFavorited ? theme.error : theme.iconColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onMessage} style={styles.actionIcon}>
            <Ionicons
              name='chatbubble-ellipses-outline'
              size={20}
              color={theme.iconColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onViewDetails}
            style={[styles.viewDetailsBtn, { backgroundColor: theme.primary }]}
          >
            <ThemedText style={styles.viewDetailsBtnText}>
              View Details
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EmployeeCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#0000008b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  nameSection: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  roleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    gap: 8,
  },
  roleText: {
    fontSize: 14,
    fontWeight: "600",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F4B740",
  },
  detailsSection: {
    gap: 6,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    opacity: 0.8,
  },
  dollarSign: {
    fontSize: 15,
    fontWeight: "700",
  },
  salaryText: {
    fontSize: 15,
    fontWeight: "600",
  },
  dateText: {
    fontSize: 13,
    opacity: 0.6,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e0e0e0",
    paddingTop: 12,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    fontSize: 13,
    fontWeight: "500",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actionIcon: {
    backgroundColor: "#E5F1FF",
    borderRadius: 24,
    padding: 4,
  },
  viewDetailsBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewDetailsBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
