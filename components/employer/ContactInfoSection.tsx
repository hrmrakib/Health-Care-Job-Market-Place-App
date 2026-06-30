import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '../ui/ThemedText';

interface ContactInfoSectionProps {
  email: string;
  phone: string;
  location: string;
}

interface ContactRowProps {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

/** A single contact info row with icon, label, and value */
const ContactRow = ({ iconName, label, value }: ContactRowProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.contactRow}>
      <View style={[styles.contactIconCircle, { backgroundColor: `${theme.primary}12` }]}>
        <Ionicons name={iconName} size={18} color={theme.primary} />
      </View>
      <View style={styles.contactTextContainer}>
        <ThemedText style={styles.contactLabel}>{label}</ThemedText>
        <ThemedText title style={styles.contactValue}>
          {value}
        </ThemedText>
      </View>
    </View>
  );
};

/**
 * Collapsible "Contact Information" section.
 * Shows email, phone, and location with expand/collapse toggle.
 */
const ContactInfoSection = ({ email, phone, location }: ContactInfoSectionProps) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <View style={styles.section}>
      {/* Section Header */}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <ThemedText title style={styles.sectionTitle}>
          Contact Information
        </ThemedText>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={theme.title}
        />
      </TouchableOpacity>

      {/* Collapsible Content */}
      {isExpanded && (
        <View style={[styles.contactCard, { backgroundColor: theme.surface }]}>
          <ContactRow iconName="mail-outline" label="Email" value={email} />
          <View style={[styles.divider, { backgroundColor: theme.background }]} />
          <ContactRow iconName="call-outline" label="Phone" value={phone} />
          <View style={[styles.divider, { backgroundColor: theme.background }]} />
          <ContactRow iconName="location-outline" label="Location" value={location} />
        </View>
      )}
    </View>
  );
};

export default ContactInfoSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  contactCard: {
    borderRadius: 14,
    padding: 16,
    shadowColor: '#0000008b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  contactIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: 4,
    marginLeft: 54,
  },
});
