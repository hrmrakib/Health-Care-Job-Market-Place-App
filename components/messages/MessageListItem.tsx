import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Avatar from '../ui/Avatar';
import { Conversation } from '../../store/messagesStore';

interface MessageListItemProps {
  conversation: Conversation;
  onPress: () => void;
}

export default function MessageListItem({ conversation, onPress }: MessageListItemProps) {
  const { participant, lastMessage, unreadCount } = conversation;
  
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]} 
      onPress={onPress}
    >
      <View style={styles.avatarContainer}>
        <Avatar 
          url={participant.avatarUrl} 
          name={participant.name} 
          size={56} 
          isOnline={participant.isOnline} 
        />
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>
            {participant.name}
          </Text>
          {lastMessage && (
            <Text style={styles.time}>
              {lastMessage.timestamp}
            </Text>
          )}
        </View>
        
        <View style={styles.messageRow}>
          <Text 
            style={[styles.messagePreview, unreadCount > 0 && styles.unreadMessagePreview]} 
            numberOfLines={2}
          >
            {lastMessage?.text || 'No messages yet'}
          </Text>
          
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount > 99 ? '99+' : unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: '#f8fafc',
  },
  avatarContainer: {
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    color: '#64748b',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  messagePreview: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
    marginRight: 8,
    lineHeight: 20,
  },
  unreadMessagePreview: {
    fontWeight: '500',
    color: '#334155',
  },
  badge: {
    backgroundColor: '#0f766e', // Teal color matching the design
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginTop: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  }
});
