import { Stack } from "expo-router";
import AppLayout from "../AppLayout";

export default function RootLayout() {
  return (
    <AppLayout>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
        }}
      />
    </AppLayout>
  );
}
