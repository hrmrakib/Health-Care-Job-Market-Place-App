import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '../../../components/ui/ThemedView';
import ThemedInput from '../../../components/ui/ThemedInput';
import HeaderBar from '../../../components/employer/HeaderBar';
import GradientButton from '../../../components/shared/GradientButton';
import { useTheme } from '../../../context/ThemeContext';

interface PasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordErrors {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

/**
 * Change Password Screen
 * Three password fields (Old, New, Confirm) with validation and a "CHANGE NOW" button.
 */
const ChangePasswordScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<PasswordForm>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<PasswordErrors>({});

  /** Update a single field in the form state */
  const updateField = (field: keyof PasswordForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear the error for the field being edited
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  /** Validate all fields and return true if the form is valid */
  const validate = (): boolean => {
    const newErrors: PasswordErrors = {};

    if (!form.oldPassword) {
      newErrors.oldPassword = 'Old password is required';
    }

    if (!form.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (form.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (form.confirmPassword !== form.newPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Handle submission with simulated API call */
  const handleChangePassword = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate a short network delay
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Success', 'Your password has been changed successfully.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }, 1200);
  };

  return (
    <ThemedView style={styles.container}>
      <HeaderBar
        title="Change Password"
        showBackButton
        onBack={() => router.back()}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            {/* Old Password */}
            <ThemedInput
              label="Old Password"
              placeholder="Enter old password"
              secureTextEntry
              value={form.oldPassword}
              onChangeText={(text) => updateField('oldPassword', text)}
              error={errors.oldPassword}
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={theme.iconColor}
                />
              }
            />

            {/* New Password */}
            <ThemedInput
              label="New Password"
              placeholder="Enter new password"
              secureTextEntry
              value={form.newPassword}
              onChangeText={(text) => updateField('newPassword', text)}
              error={errors.newPassword}
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={theme.iconColor}
                />
              }
            />

            {/* Confirm Password */}
            <ThemedInput
              label="Confirm Password"
              placeholder="Confirm new password"
              secureTextEntry
              value={form.confirmPassword}
              onChangeText={(text) => updateField('confirmPassword', text)}
              error={errors.confirmPassword}
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={theme.iconColor}
                />
              }
            />
          </View>
        </ScrollView>

        {/* Fixed bottom button */}
        <View style={styles.bottomAction}>
          <GradientButton
            title={isSubmitting ? 'CHANGING...' : 'CHANGE NOW'}
            onPress={handleChangePassword}
            style={styles.submitButton}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ChangePasswordScreen;

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
    paddingBottom: 100,
  },
  formContainer: {
    gap: 4,
  },
  bottomAction: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    paddingTop: 12,
  },
  submitButton: {
    width: '100%',
  },
});
