import { create } from 'zustand';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatarUrl?: string;
    isOnline: boolean;
  };
  lastMessage?: Message;
  unreadCount: number;
}

interface MessagesState {
  conversations: Conversation[];
  messages: Record<string, Message[]>; // Keyed by conversationId
  sendMessage: (conversationId: string, text: string) => void;
  markAsRead: (conversationId: string) => void;
}

const mockMessages: Message[] = [
  { id: '1', conversationId: '1', senderId: 'user_1', text: 'Hello! Thank you for applying to our CNA position.', timestamp: '10:30 AM', isRead: true },
  { id: '2', conversationId: '1', senderId: 'user_1', text: 'We reviewed your application and would like to schedule an interview.', timestamp: '10:30 AM', isRead: true },
  { id: '3', conversationId: '1', senderId: 'me', text: 'Thank you so much! I would be happy to come in for an interview.', timestamp: '10:30 AM', isRead: true },
  { id: '4', conversationId: '1', senderId: 'user_1', text: 'How about this Thursday at 2:00 PM?', timestamp: '10:30 AM', isRead: true },
  { id: '5', conversationId: '1', senderId: 'user_1', text: 'Please bring your CNA certification and resume.', timestamp: '10:30 AM', isRead: true },
];

const mockConversations: Conversation[] = [
  {
    id: '1',
    participant: {
      id: 'user_1',
      name: 'Mr. John',
      avatarUrl: 'https://i.pravatar.cc/150?u=mrjohn',
      isOnline: true,
    },
    lastMessage: mockMessages[mockMessages.length - 1],
    unreadCount: 3,
  },
  {
    id: '2',
    participant: {
      id: 'user_2',
      name: 'MR. John',
      avatarUrl: 'https://i.pravatar.cc/150?u=mrjohn2',
      isOnline: true,
    },
    lastMessage: { id: 'm1', conversationId: '2', senderId: 'user_2', text: 'We\'d like to schedule an interview for the RN position', timestamp: '1m ago', isRead: false },
    unreadCount: 1,
  },
  {
    id: '3',
    participant: {
      id: 'user_3',
      name: 'MR. John',
      avatarUrl: 'https://i.pravatar.cc/150?u=mrjohn3',
      isOnline: false,
    },
    lastMessage: { id: 'm2', conversationId: '3', senderId: 'user_3', text: 'We\'d like to schedule an interview for the RN position', timestamp: '1m ago', isRead: false },
    unreadCount: 1,
  },
  {
    id: '4',
    participant: {
      id: 'user_4',
      name: 'MR. John',
      avatarUrl: 'https://i.pravatar.cc/150?u=mrjohn4',
      isOnline: false,
    },
    lastMessage: { id: 'm3', conversationId: '4', senderId: 'user_4', text: 'We\'d like to schedule an interview for the RN position', timestamp: '1m ago', isRead: false },
    unreadCount: 1,
  },
];

export const useMessagesStore = create<MessagesState>((set) => ({
  conversations: mockConversations,
  messages: {
    '1': mockMessages,
    '2': [{ id: 'm1', conversationId: '2', senderId: 'user_2', text: 'We\'d like to schedule an interview for the RN position', timestamp: '1m ago', isRead: false }],
    '3': [{ id: 'm2', conversationId: '3', senderId: 'user_3', text: 'We\'d like to schedule an interview for the RN position', timestamp: '1m ago', isRead: false }],
    '4': [{ id: 'm3', conversationId: '4', senderId: 'user_4', text: 'We\'d like to schedule an interview for the RN position', timestamp: '1m ago', isRead: false }],
  },
  sendMessage: (conversationId, text) => set((state) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      conversationId,
      senderId: 'me',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };
    
    return {
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), newMessage],
      },
      conversations: state.conversations.map(conv => 
        conv.id === conversationId 
          ? { ...conv, lastMessage: newMessage, unreadCount: 0 } 
          : conv
      )
    };
  }),
  markAsRead: (conversationId) => set((state) => ({
    conversations: state.conversations.map(conv =>
      conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
    )
  }))
}));
