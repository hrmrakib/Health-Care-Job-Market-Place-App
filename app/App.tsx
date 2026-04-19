import { StyleSheet } from "react-native";
import AppLayout from "../AppLayout";
import Home from "../screens/home/Home";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectYourRolePage from "../screens/role/SelectYourRole";

export default function App() {
  return (
    <AppLayout>
      <SafeAreaView style={{ flex: 1 }}>
        <SelectYourRolePage />
      </SafeAreaView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
