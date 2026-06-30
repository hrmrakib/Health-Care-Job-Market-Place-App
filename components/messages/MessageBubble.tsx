import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../../store/messagesStore';

interface MessageBubbleProps {
  message: Message;
  isMyMessage: boolean;
}

export default function MessageBubble({ message, isMyMessage }: MessageBubbleProps) {
  return (
    <View style={[
      styles.container,
      isMyMessage ? styles.myMessageContainer : styles.otherMessageContainer
    ]}>
      <View style={[
        styles.bubble,
        isMyMessage ? styles.myBubble : styles.otherBubble
      ]}>
        <Text style={[
          styles.text,
          isMyMessage ? styles.myText : styles.otherText
        ]}>
          {message.text}
        </Text>
      </View>
      <View style={[
        styles.footer,
        isMyMessage ? styles.myFooter : styles.otherFooter
      ]}>
        <Text style={styles.time}>{message.timestamp}</Text>
        {isMyMessage && (
          <Text style={styles.statusIcon}>
            {message.isRead ? '✓✓' : '✓'}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    maxWidth: '85%',
    paddingHorizontal: 16,
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    padding: 12,
    borderRadius: 20,
    marginBottom: 4,
  },
  myBubble: {
    backgroundColor: '#056b85', // Teal color for my messages
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#ffffff', // White for others
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
  },
  myText: {
    color: '#ffffff',
  },
  otherText: {
    color: '#334155',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  myFooter: {
    justifyContent: 'flex-end',
  },
  otherFooter: {
    justifyContent: 'flex-start',
  },
  time: {
    fontSize: 11,
    color: '#94a3b8',
    marginHorizontal: 4,
  },
  statusIcon: {
    fontSize: 10,
    color: '#056b85',
    fontWeight: 'bold',
  }
});
