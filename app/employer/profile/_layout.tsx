import { Stack } from 'expo-router';

/**
 * Nested Stack layout for the Employer Profile tab.
 * Allows navigation from the main profile screen to sub-screens
 * (Change Password, Terms & Policies, About Us, Edit Company)
 * while staying within the Profile tab.
 */
export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="change-password" />
      <Stack.Screen name="terms-policies" />
      <Stack.Screen name="about-us" />
      <Stack.Screen name="edit-company" />
      <Stack.Screen name="support" />
    </Stack>
  );
}
