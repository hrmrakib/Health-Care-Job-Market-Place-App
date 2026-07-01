import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import ThemedView from '../../components/ui/ThemedView';
import HeaderBar from '../../components/employer/HeaderBar';
import PaymentStatCard from '../../components/payments/PaymentStatCard';
import DigitalWalletCard from '../../components/payments/DigitalWalletCard';
import PaymentSection from '../../components/payments/PaymentSection';
import { usePaymentsStore, PaymentJob } from '../../store/paymentsStore';
import { useNotificationsStore } from '../../store/notificationsStore';

/**
 * Main Payments Screen
 * Displays payment stats, digital wallet balance, and lists of pending/completed payments.
 */
const PaymentsScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const {
    walletBalance,
    totalPaid,
    pendingCount,
    completedCount,
    pendingJobs,
    completedJobs,
    deleteCompletedJob,
  } = usePaymentsStore();

  const { getNewCount } = useNotificationsStore();
  const notifCount = getNewCount('employer');

  const handleViewDetails = (job: PaymentJob) => {
    // Navigate to job details or candidate profile
    router.push('/employer/candidate-profile');
  };

  const handleAddAmount = () => {
    router.push('/employer/add-amount');
  };

  return (
    <ThemedView style={styles.container}>
      <HeaderBar
        title="Payments"
        subtitle="Manage your employee payments"
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
        {/* Top Stats Row */}
        <View style={styles.statsRow}>
          <PaymentStatCard
            value={`$${totalPaid}`}
            label="Total Paid"
            iconName="cash-outline"
            iconColor={theme.success}
          />
          <PaymentStatCard
            value={pendingCount.toString()}
            label="Pending"
            iconName="time-outline"
            iconColor="#F59E0B"
          />
          <PaymentStatCard
            value={completedCount.toString()}
            label="Completed"
            iconName="trending-up-outline"
            iconColor="#3B82F6"
          />
        </View>

        {/* Digital Wallet Card */}
        <View style={styles.walletContainer}>
          <DigitalWalletCard balance={walletBalance} onAddAmount={handleAddAmount} />
        </View>

        {/* Pending Payments Section */}
        <PaymentSection
          title="Pending Payments"
          count={pendingCount}
          jobs={pendingJobs}
          onViewDetails={handleViewDetails}
        />

        {/* Completed Payments Section */}
        <PaymentSection
          title="Completed Payment"
          count={completedCount}
          jobs={completedJobs}
          onViewDetails={handleViewDetails}
          onDelete={deleteCompletedJob}
        />
      </ScrollView>
    </ThemedView>
  );
};

export default PaymentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 20,
  },
  walletContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
});
