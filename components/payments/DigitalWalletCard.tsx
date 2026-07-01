import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import ThemedText from '../ui/ThemedText';
import GradientButton from '../shared/GradientButton';

interface DigitalWalletCardProps {
  balance: number;
  onAddAmount: () => void;
}

/**
 * Digital Wallet card component.
 * Shows the wallet icon header, a tinted balance display box,
 * and an "ADD AMOUNT" gradient button.
 */
const DigitalWalletCard = ({ balance, onAddAmount }: DigitalWalletCardProps) => {
  const { theme } = useTheme();

  const formattedBalance = balance.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      {/* Wallet Icon Row */}
      <View style={styles.walletHeader}>
        <View style={[styles.walletIconCircle, { backgroundColor: `${theme.primary}14` }]}>
          <Ionicons name="card-outline" size={22} color={theme.primary} />
        </View>
        <ThemedText title style={styles.walletTitle}>
          Digital Wallet
        </ThemedText>
      </View>

      {/* Balance Display */}
      <View style={[styles.balanceBox, { backgroundColor: `${theme.primary}10` }]}>
        <ThemedText style={[styles.totalLabel, { color: theme.primary }]}>
          Total
        </ThemedText>
        <ThemedText title style={styles.balanceAmount}>
          ${formattedBalance}
        </ThemedText>
      </View>

      {/* Add Amount Button */}
      <GradientButton
        title="ADD AMOUNT"
        onPress={onAddAmount}
        style={styles.addButton}
      />
    </View>
  );
};

export default DigitalWalletCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#0000008b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  walletIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  balanceBox: {
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -1,
  },
  addButton: {
    width: '100%',
    borderRadius: 10,
  },
});
