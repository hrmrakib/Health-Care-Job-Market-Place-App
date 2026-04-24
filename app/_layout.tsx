import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "white" },
          }}
        />
      </ThemeProvider>
    </SafeAreaView>
  );
}
