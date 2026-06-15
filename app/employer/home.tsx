import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import ThemedView from "../../components/ui/ThemedView";
import HeaderBar from "../../components/employer/HeaderBar";
import StatCard from "../../components/employer/StatCard";
import EmployeeCard from "../../components/employer/EmployeeCard";
import GradientButton from "../../components/shared/GradientButton";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ThemedText from "../../components/ui/ThemedText";

const EmployerHome = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const handlePostJob = () => {
    router.push("/employer/create-job");
  };

  const handleViewDetails = () => {
    router.push("/employer/candidate-profile");
  };

  return (
    <ThemedView style={styles.container}>
      <HeaderBar
        title='City Hospital'
        subtitle='Post & Hire'
        rightActions={{
          heart: true,
          message: true,
          messageCount: 3,
          notification: true,
          notificationCount: 3,
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <StatCard
            icon={
              <Ionicons
                name='briefcase-outline'
                size={24}
                color={theme.primary}
              />
            }
            count={12}
            label='Active Jobs'
            iconBackgroundColor={theme.primary}
          />
          <StatCard
            icon={
              <Ionicons name='people-outline' size={24} color={theme.error} />
            }
            count={48}
            label='Completed'
            iconBackgroundColor={theme.error}
          />
          <StatCard
            icon={
              <Ionicons
                name='person-add-outline'
                size={24}
                color={theme.success}
              />
            }
            count={8}
            label='Upcoming'
            iconBackgroundColor={theme.success}
          />
        </View>

        {/* Post Job Action */}
        <GradientButton
          title='+ Post a New Job'
          onPress={handlePostJob}
          style={styles.postJobBtn}
        />

        {/* Recent Employees Section */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>
            Recent Assign Employees
          </ThemedText>
        </View>

        {/* Dummy List */}
        <EmployeeCard
          name='Miss. Sarah'
          role='CNA'
          status='Upcoming'
          statusColor={theme.iconColor}
          rating={4.8}
          location='Los Angeles, CA'
          salary='22 / hour'
          shift='Night Shift'
          shiftType='Full-time'
          date='12 March, 2026'
          timeRemaining='8h remaining'
          onViewDetails={handleViewDetails}
          avatarUri='https://randomuser.me/api/portraits/women/44.jpg'
        />

        <EmployeeCard
          name='Miss. Sarah'
          role='CNA'
          status='Upcoming'
          statusColor={theme.iconColor}
          rating={4.8}
          location='Los Angeles, CA'
          salary='22 / hour'
          shift='Night Shift'
          shiftType='Full-time'
          date='12 March, 2026'
          timeRemaining='8h remaining'
          onViewDetails={handleViewDetails}
          avatarUri='https://randomuser.me/api/portraits/women/45.jpg'
        />

        <EmployeeCard
          name='Miss. Sarah'
          role='CNA'
          status='Upcoming'
          statusColor={theme.iconColor}
          rating={4.8}
          location='Los Angeles, CA'
          salary='22 / hour'
          shift='Night Shift'
          shiftType='Full-time'
          date='12 March, 2026'
          timeRemaining='8h remaining'
          onViewDetails={handleViewDetails}
          avatarUri='https://randomuser.me/api/portraits/women/46.jpg'
        />
      </ScrollView>
    </ThemedView>
  );
};

export default EmployerHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  postJobBtn: {
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    opacity: 0.8,
  },
});
