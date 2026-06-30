import React from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '../../../components/ui/ThemedView';
import HeaderBar from '../../../components/employer/HeaderBar';
import CompanyProfileCard from '../../../components/employer/CompanyProfileCard';
import StatCard from '../../../components/employer/StatCard';
import ContactInfoSection from '../../../components/employer/ContactInfoSection';
import ProfileActionsSection from '../../../components/employer/ProfileActionsSection';
import { useTheme } from '../../../context/ThemeContext';
import { useEmployerProfileStore } from '../../../store/employerProfileStore';
import { useNotificationsStore } from '../../../store/notificationsStore';

/**
 * Employer Profile Screen
 * Displays the company profile card, job stats, contact information,
 * and action items for managing the account (matching the provided design).
 */
const EmployerProfileScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { profile } = useEmployerProfileStore();
  const { getNewCount } = useNotificationsStore();
  const notifCount = getNewCount('employer');

  /** Confirmation dialog for destructive actions */
  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const handleLogOut = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => {} },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header with message + notification badges — tapping bells navigates to screens */}
      <HeaderBar
        title="Profile"
        rightActions={{
          message: true,
          messageCount: 3,
          notification: true,
          notificationCount: notifCount,
        }}
        onMessagePress={() => router.push('/messages')}
        onNotificationPress={() => router.push('/employer/notifications')}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Company Profile Card */}
        <CompanyProfileCard
          companyName={profile.companyName}
          location={profile.location}
          rating={profile.rating}
          description={profile.description}
          logoUrl={profile.companyLogo}
        />

        {/* Job Stats Row */}
        <View style={styles.statsRow}>
          <StatCard
            icon={
              <Ionicons name="videocam-outline" size={22} color={theme.primary} />
            }
            count={profile.ongoingJobs}
            label="Ongoing Jobs"
          />
          <StatCard
            icon={
              <Ionicons name="document-text-outline" size={22} color="#27AE60" />
            }
            count={profile.completedJobs}
            label="Completed Jobs"
            iconBackgroundColor="#27AE60"
          />
        </View>

        {/* Contact Information Section (collapsible) */}
        <ContactInfoSection
          email={profile.email}
          phone={profile.phone}
          location={profile.location}
        />

        {/* Actions Section (collapsible) */}
        <ProfileActionsSection
          onEditCompany={() => router.push('/employer/profile/edit-company')}
          onChangePassword={() => router.push('/employer/profile/change-password')}
          onTermsPolicies={() => router.push('/employer/profile/terms-policies')}
          onAboutUs={() => router.push('/employer/profile/about-us')}
          onSupport={() => router.push('/employer/profile/support')}
          onDeleteAccount={handleDeleteAccount}
          onLogOut={handleLogOut}
        />
      </ScrollView>
    </ThemedView>
  );
};

export default EmployerProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Extra padding for bottom tab bar
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    paddingHorizontal: 16,
  },
});
