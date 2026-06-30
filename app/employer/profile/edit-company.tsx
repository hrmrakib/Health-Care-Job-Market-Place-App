import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import ThemedView from '../../../components/ui/ThemedView';
import ThemedText from '../../../components/ui/ThemedText';
import ThemedInput from '../../../components/ui/ThemedInput';
import HeaderBar from '../../../components/employer/HeaderBar';
import GradientButton from '../../../components/shared/GradientButton';
import { useTheme } from '../../../context/ThemeContext';
import { useEmployerProfileStore } from '../../../store/employerProfileStore';

interface CompanyForm {
  companyName: string;
  companyLocation: string;
  contactNumber: string;
  description: string;
}

interface FormErrors {
  companyName?: string;
  companyLocation?: string;
  contactNumber?: string;
  description?: string;
}

/**
 * Edit Company Setup Screen
 * Allows the employer to update their company profile information.
 * Pre-fills fields from the existing profile store data.
 */
const EditCompanyScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { profile, updateProfile } = useEmployerProfileStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<CompanyForm>({
    companyName: profile.companyName,
    companyLocation: profile.location,
    contactNumber: profile.phone,
    description: profile.description,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  /** Update a single field */
  const updateField = (field: keyof CompanyForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  /** Validate the form */
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!form.companyLocation.trim()) newErrors.companyLocation = 'Location is required';
    if (!form.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Handle save with simulated delay */
  const handleSave = () => {
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      updateProfile({
        companyName: form.companyName,
        location: form.companyLocation,
        phone: form.contactNumber,
        description: form.description,
      });
      setIsSubmitting(false);
      Alert.alert('Success', 'Company profile updated successfully.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }, 1000);
  };

  return (
    <ThemedView style={styles.container}>
      <HeaderBar
        title="Edit Company Setup"
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
          {/* Logo Upload Placeholder */}
          <View style={styles.logoSection}>
            <ThemedText style={styles.logoLabel}>Company Logo</ThemedText>
            <View style={styles.logoUploadWrapper}>
              <TouchableOpacity
                style={[styles.logoUploadBox, { backgroundColor: theme.surface, borderColor: theme.iconColor }]}
                activeOpacity={0.7}
              >
                <Feather name="upload" size={36} color={theme.iconColor} />
                <ThemedText style={styles.uploadText}>Upload Logo</ThemedText>
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.logoHint}>PNG, JPG up to 5MB</ThemedText>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <ThemedInput
              label="Company Name"
              placeholder="e.g., City Hospital"
              value={form.companyName}
              onChangeText={(text) => updateField('companyName', text)}
              error={errors.companyName}
              icon={
                <Ionicons name="business-outline" size={20} color={theme.iconColor} />
              }
            />
            <ThemedInput
              label="Company Location"
              placeholder="e.g., San Francisco, CA"
              value={form.companyLocation}
              onChangeText={(text) => updateField('companyLocation', text)}
              error={errors.companyLocation}
              icon={
                <Ionicons name="location-outline" size={20} color={theme.iconColor} />
              }
            />
            <ThemedInput
              label="Contact Number"
              placeholder="e.g., (555) 123-4567"
              value={form.contactNumber}
              onChangeText={(text) => updateField('contactNumber', text)}
              error={errors.contactNumber}
              icon={
                <Ionicons name="call-outline" size={20} color={theme.iconColor} />
              }
            />
            <ThemedInput
              label="Company Description"
              placeholder="Tell healthcare professionals about your organization..."
              multiline
              value={form.description}
              onChangeText={(text) => updateField('description', text)}
              error={errors.description}
            />
          </View>
        </ScrollView>

        {/* Fixed Save button */}
        <View style={styles.bottomAction}>
          <GradientButton
            title={isSubmitting ? 'SAVING...' : 'SAVE CHANGES'}
            onPress={handleSave}
            style={styles.submitButton}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default EditCompanyScreen;

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
  logoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoLabel: {
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  logoUploadWrapper: {
    alignItems: 'center',
  },
  logoUploadBox: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0000008b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  uploadText: {
    marginTop: 8,
    fontSize: 13,
    opacity: 0.7,
  },
  logoHint: {
    marginTop: 8,
    fontSize: 12,
    opacity: 0.5,
    textAlign: 'center',
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
