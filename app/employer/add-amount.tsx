import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import ThemedView from '../../components/ui/ThemedView';
import ThemedText from '../../components/ui/ThemedText';
import ThemedInput from '../../components/ui/ThemedInput';
import HeaderBar from '../../components/employer/HeaderBar';
import GradientButton from '../../components/shared/GradientButton';
import { usePaymentsStore } from '../../store/paymentsStore';

type PaymentMethod = 'stripe' | 'visa' | 'amex';

/**
 * Add Amount Screen
 * Allows adding funds to the digital wallet.
 */
const AddAmountScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { walletBalance, addFunds } = usePaymentsStore();

  const [amountStr, setAmountStr] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('stripe');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formattedBalance = walletBalance.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const handleAddNow = () => {
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount to add.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      addFunds(amount);
      setIsSubmitting(false);
      Alert.alert('Success', `$${amount} has been added to your Digital Wallet.`, [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }, 1000);
  };

  const renderMethod = (method: PaymentMethod, label: string, color: string) => {
    const isSelected = selectedMethod === method;
    return (
      <TouchableOpacity
        style={[
          styles.methodBox,
          { backgroundColor: isSelected ? `${color}15` : `${theme.iconColor}10` },
        ]}
        onPress={() => setSelectedMethod(method)}
        activeOpacity={0.7}
      >
        <ThemedText style={[styles.methodLabel, { color: isSelected ? color : theme.iconColor }]}>
          {label}
        </ThemedText>
        {isSelected && (
          <View style={styles.checkBadge}>
            <Ionicons name="checkmark-circle" size={18} color={color} />
          </View>
        )}
        {!isSelected && (
          <View style={styles.checkBadge}>
            <Ionicons name="checkmark-circle" size={18} color={`${theme.iconColor}40`} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <HeaderBar title="Add Amount" showBackButton onBack={() => router.back()} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Main Card */}
          <View style={[styles.card, { backgroundColor: theme.surface }]}>
            {/* Wallet Header */}
            <View style={styles.walletHeader}>
              <View style={[styles.walletIconCircle, { backgroundColor: `${theme.primary}15` }]}>
                <Ionicons name="card-outline" size={20} color={theme.primary} />
              </View>
              <ThemedText title style={styles.walletTitle}>
                Digital Wallet
              </ThemedText>
            </View>

            {/* Current Balance Display */}
            <View style={[styles.balanceBox, { backgroundColor: `${theme.primary}10` }]}>
              <ThemedText style={[styles.totalLabel, { color: theme.primary }]}>
                Total
              </ThemedText>
              <ThemedText title style={styles.balanceAmount}>
                ${formattedBalance}
              </ThemedText>
            </View>

            {/* Amount Input */}
            <View style={styles.inputSection}>
              <ThemedInput
                label="Enter Amount"
                placeholder="0.00"
                keyboardType="numeric"
                value={amountStr}
                onChangeText={setAmountStr}
                icon={<ThemedText style={[styles.currencySymbol, { color: theme.primary }]}>$</ThemedText>}
              />
            </View>
          </View>

          {/* Payment Method Card */}
          <View style={[styles.card, { backgroundColor: theme.surface }]}>
            <ThemedText style={styles.methodTitle}>Payment Method</ThemedText>
            <View style={styles.methodsRow}>
              {renderMethod('stripe', 'Stripe', '#635BFF')}
              {renderMethod('visa', 'VISA', '#1434CB')}
              {renderMethod('amex', 'AMEX', '#002663')}
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomAction}>
          <GradientButton
            title={isSubmitting ? 'PROCESSING...' : 'ADD NOW'}
            onPress={handleAddNow}
            style={styles.submitBtn}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default AddAmountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#0000008b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  walletIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  balanceBox: {
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
  },
  inputSection: {
    marginTop: 8,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
  },
  methodTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  methodsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  methodBox: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  methodLabel: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  checkBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  bottomAction: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    paddingTop: 12,
  },
  submitBtn: {
    width: '100%',
  },
});
