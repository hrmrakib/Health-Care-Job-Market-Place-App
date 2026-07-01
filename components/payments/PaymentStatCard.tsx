import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import ThemedText from '../ui/ThemedText';
import { Ionicons } from '@expo/vector-icons';

interface PaymentStatCardProps {
  /** Dollar amount or count to display */
  value: string;
  /** Label below the value */
  label: string;
  /** Ionicons icon name */
  iconName: keyof typeof Ionicons.glyphMap;
  /** Icon tint color */
  iconColor: string;
}

/**
 * A compact stat summary card for the Payments screen top row.
 * Shows an icon, a bold value, and a descriptive label.
 */
const PaymentStatCard = ({
  value,
  label,
  iconName,
  iconColor,
}: PaymentStatCardProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      <View style={[styles.iconCircle, { backgroundColor: `${iconColor}15` }]}>
        <Ionicons name={iconName} size={20} color={iconColor} />
      </View>
      <ThemedText title style={styles.value}>
        {value}
      </ThemedText>
      <ThemedText style={styles.label}>{label}</ThemedText>
    </View>
  );
};

export default PaymentStatCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 14,
    shadowColor: '#0000008b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 3,
  },
  label: {
    fontSize: 11,
    opacity: 0.6,
    textAlign: 'center',
  },
});
