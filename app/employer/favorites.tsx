import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import ThemedView from "../../components/ui/ThemedView";
import HeaderBar from "../../components/employer/HeaderBar";
import FavoriteEmployeeRow from "../../components/employer/FavoriteEmployeeRow";

const Favorites = () => {
  const { theme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <HeaderBar
        title="Favorite Employees"
        subtitle="4 Employees"
        rightActions={{
          heart: true,
          message: true,
          messageCount: 3,
          notification: true,
          notificationCount: 3,
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <FavoriteEmployeeRow
            name="Mr. Rahan"
            role="CNA"
            avatarUri="https://randomuser.me/api/portraits/men/33.jpg"
          />
          <FavoriteEmployeeRow
            name="Mr. Rahan"
            role="CNA"
            avatarUri="https://randomuser.me/api/portraits/men/33.jpg"
          />
          <FavoriteEmployeeRow
            name="Mr. Rahan"
            role="CNA"
            avatarUri="https://randomuser.me/api/portraits/men/33.jpg"
          />
          <FavoriteEmployeeRow
            name="Mr. Rahan"
            role="CNA"
            avatarUri="https://randomuser.me/api/portraits/men/33.jpg"
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 14,
    shadowColor: "#0000008b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
});
