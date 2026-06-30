import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import ThemedView from '../../components/ui/ThemedView';
import ThemedText from '../../components/ui/ThemedText';
import HeaderBar from '../../components/employer/HeaderBar';
import NotificationCard from '../../components/notifications/NotificationCard';
import { useNotificationsStore } from '../../store/notificationsStore';

/**
 * Job Seeker Notification Screen
 * Displays job-seeker-specific notifications:
 * Application Updates, Interview Schedules, Job Matches, Payment Received, etc.
 * Reuses the shared NotificationCard component.
 */
const JobSeekerNotificationsScreen = () => {
  const router = useRouter();
  const { dismissNotification, markAllRead, getByRole, getNewCount } =
    useNotificationsStore();

  const notifications = getByRole('job_seeker');
  const newCount = getNewCount('job_seeker');

  return (
    <ThemedView style={styles.container}>
      <HeaderBar
        title="Notification"
        showBackButton
        onBack={() => router.back()}
        rightElement={
          newCount > 0 ? (
            <TouchableOpacity
              style={styles.markAllBtn}
              onPress={() => markAllRead('job_seeker')}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.markAllText}>Mark all read</ThemedText>
            </TouchableOpacity>
          ) : undefined
        }
      />

      {/* New notifications count label */}
      {newCount > 0 && (
        <View style={styles.newCountContainer}>
          <ThemedText style={styles.newCountText}>{newCount} NEW</ThemedText>
        </View>
      )}

      {/* Notification list */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationCard
            notification={item}
            onDismiss={dismissNotification}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
              You have no notifications.
            </ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
};

export default JobSeekerNotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newCountContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  newCountText: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    opacity: 0.55,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  separator: {
    height: 10,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 15,
    opacity: 0.5,
  },
  markAllBtn: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  markAllText: {
    fontSize: 13,
    opacity: 0.65,
  },
});
