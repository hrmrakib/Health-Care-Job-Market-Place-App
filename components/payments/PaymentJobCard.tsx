import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import ThemedText from '../ui/ThemedText';
import { PaymentJob } from '../../store/paymentsStore';

interface PaymentJobCardProps {
  job: PaymentJob;
  onViewDetails?: () => void;
  onDelete?: (id: string) => void;
}

/**
 * Payment Job Card — used in both the Pending and Completed sections.
 * Displays job image, title/role/status badge, location, employees assigned badge,
 * hourly rate, shift details, time remaining, and a View Details button.
 * Completed jobs also show a red delete (trash) icon.
 */
const PaymentJobCard = ({ job, onViewDetails, onDelete }: PaymentJobCardProps) => {
  const { theme } = useTheme();

  const isCompleted = job.status === 'completed';

  /** Status color per payment status */
  const statusColor = isCompleted ? theme.success : theme.primary;
  const statusLabel = isCompleted ? 'Completed' : 'Ongoing';

  const handleDelete = () => {
    Alert.alert(
      'Delete Payment',
      'Are you sure you want to remove this completed payment record?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete?.(job.id),
        },
      ]
    );
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      {/* Top Row: avatar + info + optional delete */}
      <View style={styles.topRow}>
        {/* Job Image / Avatar */}
        <View style={[styles.jobAvatar, { backgroundColor: theme.background }]}>
          {job.imageUri ? (
            <Image source={{ uri: job.imageUri }} style={styles.jobImage} />
          ) : (
            <Ionicons name="business-outline" size={24} color={theme.iconColor} />
          )}
        </View>

        {/* Job Info */}
        <View style={styles.jobInfo}>
          <ThemedText title style={styles.jobTitle}>
            {job.title}
          </ThemedText>
          <View style={styles.roleRow}>
            <ThemedText style={[styles.roleText, { color: theme.primary }]}>
              {job.role}
            </ThemedText>
            <View style={[styles.statusBadge, { backgroundColor: `${statusColor}15` }]}>
              <ThemedText style={[styles.statusText, { color: statusColor }]}>
                {statusLabel}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Delete icon (completed only) */}
        {isCompleted && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={18} color={theme.error} />
          </TouchableOpacity>
        )}
      </View>

      {/* Detail Rows */}
      <View style={styles.detailsBlock}>
        {/* Location */}
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={15} color={theme.iconColor} />
          <ThemedText style={styles.detailText}>{job.location}</ThemedText>
        </View>

        {/* Employees Assigned */}
        <View style={[styles.detailRow, styles.employeesRow]}>
          <Ionicons name="people-outline" size={15} color={theme.iconColor} />
          <ThemedText style={styles.detailText}>Employees Assigned</ThemedText>
          <View style={[styles.countBadge, { backgroundColor: `${theme.primary}18` }]}>
            <ThemedText style={[styles.countText, { color: theme.primary }]}>
              {job.employeesAssigned}
            </ThemedText>
          </View>
        </View>

        {/* Rate */}
        <View style={styles.detailRow}>
          <ThemedText style={[styles.rateSymbol, { color: theme.success }]}>$</ThemedText>
          <ThemedText style={[styles.rateText, { color: theme.success }]}>
            ${job.ratePerHour} / hour
          </ThemedText>
        </View>

        {/* Shift + Date */}
        <View style={[styles.detailRow, styles.shiftDateRow]}>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={15} color={theme.iconColor} />
            <ThemedText style={styles.detailText}>
              {job.shift} • {job.shiftType}
            </ThemedText>
          </View>
          <ThemedText style={styles.dateText}>{job.date}</ThemedText>
        </View>
      </View>

      {/* Bottom: time remaining + View Details */}
      <View style={[styles.bottomRow, { borderTopColor: `${theme.iconColor}20` }]}>
        <View style={styles.timeRow}>
          <Ionicons name="refresh-outline" size={14} color={theme.primary} />
          <ThemedText style={[styles.timeText, { color: theme.primary }]}>
            {job.timeRemaining}
          </ThemedText>
        </View>
        <TouchableOpacity
          onPress={onViewDetails}
          style={[styles.viewBtn, { backgroundColor: theme.primary }]}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.viewBtnText}>View Details</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentJobCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#0000008b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },
  jobAvatar: {
    width: 46,
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  jobImage: {
    width: 46,
    height: 46,
    resizeMode: 'cover',
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roleText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 4,
  },
  detailsBlock: {
    gap: 7,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  employeesRow: {
    justifyContent: 'flex-start',
  },
  detailText: {
    fontSize: 13,
    opacity: 0.75,
  },
  rateSymbol: {
    fontSize: 15,
    fontWeight: '700',
  },
  rateText: {
    fontSize: 14,
    fontWeight: '600',
  },
  shiftDateRow: {
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 12,
    opacity: 0.55,
  },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
    marginLeft: 4,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 12,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '500',
  },
  viewBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
