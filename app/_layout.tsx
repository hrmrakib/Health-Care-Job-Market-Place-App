import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import RouteDebugger from "../components/test/RouteDebugger";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider>
        <RouteDebugger />
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
