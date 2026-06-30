import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '../../../components/ui/ThemedView';
import ThemedText from '../../../components/ui/ThemedText';
import HeaderBar from '../../../components/employer/HeaderBar';
import { useTheme } from '../../../context/ThemeContext';

/**
 * About Us Screen
 * Static content page with a people icon and mission statement,
 * matching the provided design screenshot.
 */
const AboutUsScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <HeaderBar
        title="About Us"
        showBackButton
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          {/* People Icon */}
          <View style={[styles.iconCircle, { backgroundColor: `${theme.primary}14` }]}>
            <Ionicons name="people" size={28} color={theme.primary} />
          </View>

          {/* About Content */}
          <ThemedText style={styles.bodyText}>
            We are a dedicated healthcare job marketplace designed to connect skilled
            professionals—doctors, nurses, and CNAs—with trusted hospitals and clinics.
            Our platform simplifies the hiring process by providing a fast, transparent,
            and reliable way to discover opportunities and fill urgent staffing needs.
            Whether you're seeking your next role or looking to hire qualified talent,
            we ensure a seamless experience with verified profiles, real-time communication,
            and smart matching. Our mission is to support the healthcare community by making
            staffing more efficient, accessible, and dependable for everyone.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default AboutUsScreen;

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
