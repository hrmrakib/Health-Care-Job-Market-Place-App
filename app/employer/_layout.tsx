import { Tabs } from "expo-router";
import BottomTabBar from "../../components/employer/BottomTabBar";

export default function EmployerLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name='all-jobs'
        options={{
          title: "Jobs", // "Jobs" tab usually handles creation/listing
        }}
      />
      <Tabs.Screen
        name='favorites'
        options={{
          title: "Payments", // Repurposing Payments tab in mockup temporarily if needed, or we just map it. The UI has Home | Jobs | Payments | Profile
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          title: "Profile",
        }}
      />
      {/* Notifications screen — hidden from tab bar, accessed via header bell icon */}
      <Tabs.Screen
        name='notifications'
        options={{
          title: "Notifications",
          href: null, // hides from tab bar
        }}
      />
    </Tabs>
  );
}
