import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '../../../components/ui/ThemedView';
import ThemedText from '../../../components/ui/ThemedText';
import ThemedInput from '../../../components/ui/ThemedInput';
import HeaderBar from '../../../components/employer/HeaderBar';
import GradientButton from '../../../components/shared/GradientButton';
import { useTheme } from '../../../context/ThemeContext';

interface SupportForm {
  name: string;
  email: string;
  message: string;
  /** File name of the selected attachment, or null */
  attachedFileName: string | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * Support Screen (Employer Profile)
 * Contact form with Name, Email, Opinion/Report/Problem textarea,
 * a file attachment picker, and a SUBMIT NOW button.
 * Matches the provided design screenshot exactly.
 */
const SupportScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<SupportForm>({
    name: '',
    email: '',
    message: '',
    attachedFileName: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  /** Update a single text field and clear its error */
  const updateField = (field: keyof SupportForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  /** Simulate file picking (expo-document-picker) */
  const handlePickFile = async () => {
    // Simulate file selection with a mock filename
    setForm((prev) => ({ ...prev, attachedFileName: 'support_screenshot.png' }));
  };

  /** Validate the form fields */
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!form.message.trim()) {
      newErrors.message = 'Please describe your issue or feedback';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Handle submission with simulated delay */
  const handleSubmit = () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setForm({ name: '', email: '', message: '', attachedFileName: null });
      Alert.alert(
        'Request Submitted',
        'Thank you for reaching out! Our support team will respond within 24 hours.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }, 1200);
  };

  return (
    <ThemedView style={styles.container}>
      <HeaderBar
        title="Support"
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
          {/* Name */}
          <ThemedInput
            label="Your Name"
            placeholder="Mr. John"
            value={form.name}
            onChangeText={(text) => updateField('name', text)}
            error={errors.name}
          />

          {/* Email */}
          <ThemedInput
            label="Your Email"
            placeholder="xyz123@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(text) => updateField('email', text)}
            error={errors.email}
          />

          {/* Opinion / Report / Problem */}
          <ThemedInput
            label="Opinion / Report / Problem"
            placeholder="Write here"
            multiline
            value={form.message}
            onChangeText={(text) => updateField('message', text)}
            error={errors.message}
          />

          {/* Attached File */}
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Attached File</ThemedText>
            <TouchableOpacity
              style={[styles.fileUploadBox, { backgroundColor: theme.surface }]}
              onPress={handlePickFile}
              activeOpacity={0.7}
            >
              {form.attachedFileName ? (
                /* Show selected file */
                <View style={styles.fileSelectedRow}>
                  <Ionicons
                    name="document-attach-outline"
                    size={24}
                    color={theme.primary}
                  />
                  <ThemedText
                    style={[styles.fileNameText, { color: theme.primary }]}
                    numberOfLines={1}
                  >
                    {form.attachedFileName}
                  </ThemedText>
                  <TouchableOpacity
                    onPress={() =>
                      setForm((prev) => ({ ...prev, attachedFileName: null }))
                    }
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name="close-circle" size={20} color={theme.error} />
                  </TouchableOpacity>
                </View>
              ) : (
                /* Upload prompt */
                <View style={styles.uploadPrompt}>
                  <View
                    style={[
                      styles.uploadIconCircle,
                      { backgroundColor: `${theme.primary}14` },
                    ]}
                  >
                    <Ionicons
                      name="share-outline"
                      size={28}
                      color={theme.title}
                      style={styles.uploadIcon}
                    />
                  </View>
                  <ThemedText style={styles.uploadHint}>
                    Tap to select file
                  </ThemedText>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Fixed bottom submit button */}
        <View style={styles.bottomAction}>
          <GradientButton
            title={isSubmitting ? 'SUBMITTING...' : 'SUBMIT NOW'}
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default SupportScreen;

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
    paddingBottom: 110,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fileUploadBox: {
    borderRadius: 14,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0000008b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  uploadPrompt: {
    alignItems: 'center',
    gap: 10,
  },
  uploadIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    transform: [{ rotate: '180deg' }], // Flip the share icon to look like upload
  },
  uploadHint: {
    fontSize: 14,
    opacity: 0.55,
  },
  fileSelectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  fileNameText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  bottomAction: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    paddingTop: 12,
  },
  submitButton: {
    width: '100%',
    borderRadius: 12,
  },
});
