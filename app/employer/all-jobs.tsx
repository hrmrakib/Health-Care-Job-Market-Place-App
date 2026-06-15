import { ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import ThemedView from "../../components/ui/ThemedView";
import HeaderBar from "../../components/employer/HeaderBar";
import SegmentedTabs, { TabOption } from "../../components/ui/SegmentedTabs";
import EmployeeCard from "../../components/employer/EmployeeCard";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "expo-router";

const tabOptions: TabOption[] = [
  { id: "all", label: "All", count: 7 },
  { id: "ongoing", label: "Ongoing", count: 5 },
  { id: "upcoming", label: "Upcoming", count: 2 },
  { id: "completed", label: "Completed", count: 2 },
];

const AllJobs = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");

  const handleViewDetails = () => {
    router.push("/employer/candidate-profile");
  };

  return (
    <ThemedView style={styles.container}>
      <HeaderBar
        title='All Jobs'
        subtitle='4 Employees'
        rightActions={{
          heart: true,
          message: true,
          messageCount: 3,
          notification: true,
          notificationCount: 3,
        }}
      />

      <SegmentedTabs
        options={tabOptions}
        selectedId={activeTab}
        onSelect={setActiveTab}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
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
          avatarUri='https://randomuser.me/api/portraits/women/44.jpg'
        />
      </ScrollView>
    </ThemedView>
  );
};

export default AllJobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
});
