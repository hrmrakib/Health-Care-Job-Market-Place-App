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
        name='create-job'
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
        name='profile/index'
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
