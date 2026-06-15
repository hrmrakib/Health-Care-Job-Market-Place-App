import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export interface TabOption {
  id: string;
  label: string;
  count: number;
}

interface SegmentedTabsProps {
  options: TabOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function SegmentedTabs({
  options,
  selectedId,
  onSelect,
}: SegmentedTabsProps) {
  return (
    <View style={styles.outerContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {options.map((item) => {
          const isSelected = item.id === selectedId;

          if (isSelected) {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => onSelect(item.id)}
                activeOpacity={0.9}
              >
                {/* Gradient background matching the design */}
                <LinearGradient
                  colors={["#003875", "#006B8D", "#007A87"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.tab, styles.selectedTab]}
                >
                  <Text style={[styles.labelText, styles.selectedLabelText]}>
                    {item.label}
                  </Text>
                  <View style={[styles.badge, styles.selectedBadge]}>
                    <Text style={[styles.badgeText, styles.selectedBadgeText]}>
                      {item.count}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.tab}
              onPress={() => onSelect(item.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.labelText, styles.unselectedLabelText]}>
                {item.label}
              </Text>
              <View style={[styles.badge, styles.unselectedBadge]}>
                <Text style={[styles.badgeText, styles.unselectedBadgeText]}>
                  {item.count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#E6ECF2", // Light grey-blue container pill background
    borderRadius: 12,
    padding: 6,
    marginHorizontal: 16,
    marginVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  selectedTab: {
    ...Platform.select({
      ios: {
        shadowColor: "#003875",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  labelText: {
    fontSize: 15,
    fontWeight: "600",
  },
  selectedLabelText: {
    color: "#FFFFFF",
  },
  unselectedLabelText: {
    color: "#3A4D5F", // Muted dark grey-blue
  },
  badge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  selectedBadge: {
    backgroundColor: "#FFFFFF",
  },
  unselectedBadge: {
    backgroundColor: "#FFFFFF",
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "700",
  },
  selectedBadgeText: {
    color: "#003875", // Dark tone for active badge text
  },
  unselectedBadgeText: {
    color: "#1A2B3C",
  },
});
