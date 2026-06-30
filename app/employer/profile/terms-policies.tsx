import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '../../../components/ui/ThemedView';
import ThemedText from '../../../components/ui/ThemedText';
import HeaderBar from '../../../components/employer/HeaderBar';
import { useTheme } from '../../../context/ThemeContext';

/**
 * Terms & Policies Screen
 * Static content page with a shield icon and policy text,
 * matching the provided design screenshot.
 */
const TermsPoliciesScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <HeaderBar
        title="Terms & Policies"
        showBackButton
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          {/* Shield Icon */}
          <View style={[styles.iconCircle, { backgroundColor: `${theme.primary}14` }]}>
            <Ionicons name="shield-checkmark-outline" size={28} color={theme.primary} />
          </View>

          {/* Policy Content */}
          <ThemedText style={styles.bodyText}>
            We value your privacy and are committed to protecting your personal information.
            Our platform collects essential data such as your profile details, professional
            credentials, and communication activity to provide a secure and efficient job-matching
            experience. All information is stored securely and used only to improve our services,
            verify user authenticity, and facilitate connections between healthcare professionals
            and employers. We do not sell or share your personal data with third parties without
            your consent, except when required by law. By using our app, you agree to our data
            practices designed to ensure safety, transparency, and trust.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default TermsPoliciesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#0000008b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    opacity: 0.85,
  },
});
