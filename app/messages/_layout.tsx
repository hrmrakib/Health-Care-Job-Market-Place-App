import { Stack } from 'expo-router';

export default function MessagesLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Messages',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#f8fafc' },
        }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ 
          headerShown: false // We will build a custom header for the chat thread
        }} 
      />
    </Stack>
  );
}
