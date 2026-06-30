import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import ThemedText from '../ui/ThemedText';
import {
  Notification,
  categoryColors,
} from '../../store/notificationsStore';

interface NotificationCardProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

/**
 * A single notification card.
 * - Shows a colored category dot, bold title, descriptive message, and a dismiss (×) button.
 * - Unread notifications have a slightly highlighted background.
 */
const NotificationCard = ({ notification, onDismiss }: NotificationCardProps) => {
  const { theme } = useTheme();
  const dotColor = categoryColors[notification.category];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: notification.isRead
            ? theme.surface
            : `${dotColor}08`,
          borderColor: notification.isRead ? 'transparent' : `${dotColor}20`,
          borderWidth: 1,
        },
      ]}
    >
      {/* Row: dot + title + dismiss */}
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          {/* Category color dot */}
          <View style={[styles.dot, { backgroundColor: dotColor }]} />
          <ThemedText title style={styles.title}>
            {notification.title}
          </ThemedText>
        </View>

        {/* Dismiss button */}
        <TouchableOpacity
          style={styles.dismissButton}
          onPress={() => onDismiss(notification.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={16} color={theme.iconColor} />
        </TouchableOpacity>
      </View>

      {/* Message */}
      <ThemedText style={styles.message}>{notification.message}</ThemedText>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    shadowColor: '#0000008b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    flexShrink: 1,
  },
  dismissButton: {
    padding: 2,
    marginLeft: 8,
  },
  message: {
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.75,
    paddingLeft: 21, // Align with title (dot width + gap)
  },
});
