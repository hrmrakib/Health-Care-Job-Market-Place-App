import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '../ui/ThemedText';

interface ProfileActionItemProps {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  isDestructive?: boolean;
}

/** A single action row with icon, label, and chevron arrow */
const ProfileActionItem = ({
  iconName,
  label,
  onPress,
  isDestructive = false,
}: ProfileActionItemProps) => {
  const { theme } = useTheme();
  const textColor = isDestructive ? theme.error : theme.title;
  const iconColor = isDestructive ? theme.error : theme.iconColor;

  return (
    <TouchableOpacity
      style={[styles.actionItem, { backgroundColor: theme.surface }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.actionLeft}>
        <Ionicons name={iconName} size={20} color={iconColor} />
        <ThemedText style={[styles.actionLabel, { color: textColor }]}>{label}</ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={18} color={theme.iconColor} />
    </TouchableOpacity>
  );
};

interface ProfileActionsSectionProps {
  onEditCompany: () => void;
  onChangePassword: () => void;
  onTermsPolicies: () => void;
  onAboutUs: () => void;
  onSupport: () => void;
  onDeleteAccount: () => void;
  onLogOut: () => void;
}

/**
 * Collapsible "Actions" section for the profile screen.
 * Renders the full list of action items as shown in the design.
 */
const ProfileActionsSection = ({
  onEditCompany,
  onChangePassword,
  onTermsPolicies,
  onAboutUs,
  onSupport,
  onDeleteAccount,
  onLogOut,
}: ProfileActionsSectionProps) => {
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
          Actions
        </ThemedText>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={theme.title}
        />
      </TouchableOpacity>

      {/* Collapsible Content */}
      {isExpanded && (
        <View style={styles.actionsContainer}>
          <ProfileActionItem
            iconName="person-outline"
            label="Edit Company Setup"
            onPress={onEditCompany}
          />
          <ProfileActionItem
            iconName="key-outline"
            label="Change Password"
            onPress={onChangePassword}
          />
          <ProfileActionItem
            iconName="shield-checkmark-outline"
            label="Terms & Policies"
            onPress={onTermsPolicies}
          />
          <ProfileActionItem
            iconName="globe-outline"
            label="About Us"
            onPress={onAboutUs}
          />
          <ProfileActionItem
            iconName="chatbox-ellipses-outline"
            label="Support"
            onPress={onSupport} // navigates to /employer/profile/support
          />
          <ProfileActionItem
            iconName="trash-outline"
            label="Delete Account"
            onPress={onDeleteAccount}
            isDestructive
          />
          <ProfileActionItem
            iconName="log-out-outline"
            label="Log Out"
            onPress={onLogOut}
            isDestructive
          />
        </View>
      )}
    </View>
  );
};

export default ProfileActionsSection;

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
  actionsContainer: {
    gap: 8,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#0000008b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
});
