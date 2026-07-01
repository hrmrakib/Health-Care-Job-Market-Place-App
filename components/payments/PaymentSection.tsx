import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { PaymentJob } from '../../store/paymentsStore';
import PaymentJobCard from './PaymentJobCard';
import ThemedText from '../ui/ThemedText';

interface PaymentSectionProps {
  title: string;
  count: number;
  jobs: PaymentJob[];
  defaultExpanded?: boolean;
  onViewDetails?: (job: PaymentJob) => void;
  onDelete?: (id: string) => void;
}

/**
 * Collapsible section that renders a list of PaymentJobCards.
 * Shows title and count, and an expand/collapse chevron.
 */
const PaymentSection = ({
  title,
  count,
  jobs,
  defaultExpanded = true,
  onViewDetails,
  onDelete,
}: PaymentSectionProps) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (count === 0) return null; // Hide section if no jobs

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerRow}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <ThemedText style={styles.title}>
          {title} ({count})
        </ThemedText>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={theme.iconColor}
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.listContainer}>
          {jobs.map((job) => (
            <PaymentJobCard
              key={job.id}
              job={job}
              onViewDetails={() => onViewDetails?.(job)}
              onDelete={onDelete}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default PaymentSection;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    opacity: 0.8,
  },
  listContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
});
