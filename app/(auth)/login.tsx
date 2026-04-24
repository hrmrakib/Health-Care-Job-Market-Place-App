import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import GradientButton from "../../components/shared/GradientButton";
import { Link, useRouter } from "expo-router";
import ThemedView from "../../components/ui/ThemedView";
import ThemedText from "../../components/ui/ThemedText";
import { useGlobalStyles } from "../../styles/globalStyles";
import { useTheme } from "../../context/ThemeContext";
import LoginForm from "../../components/auth/LoginForm";
import SignupForm from "../../components/auth/SignupForm";

const LoginPage = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [tab, setTab] = React.useState<"login" | "signup">("login");

  return (
    <ThemedView style={styles.container}>
      <View style={styles.topContent}>
        <Image
          source={require("../../assets/splash-icon.png")}
          resizeMode='contain'
        />

        <ThemedText
          title
          style={[useGlobalStyles().heading, { marginTop: 0, marginBottom: 0 }]}
        >
          Welcome Back
        </ThemedText>

        <ThemedText>Sign in to continue your healthcare journey</ThemedText>

        {/* tab - login / signup */}

        <View style={[styles.tabsContent, { backgroundColor: theme.surface }]}>
          <GradientButton
            title='Login'
            onPress={() => setTab("login")}
            style={styles.tabBtn}
            variant={tab === "login" ? "default" : "outlined"}
          />
          <GradientButton
            variant={tab === "signup" ? "default" : "outlined"}
            title='Sign Up'
            onPress={() => setTab("signup")}
            style={styles.tabBtn}
          />
        </View>

        <View
          style={{
            backgroundColor: theme.surface,
            marginVertical: 20,
            paddingVertical: 20,
            minHeight: tab === "login" ? 300 : 390,
            justifyContent: "flex-start",
            borderRadius: 8,
          }}
        >
          {tab === "login" ? <LoginForm /> : <SignupForm />}
        </View>

        <GradientButton title='Login' onPress={() => alert("Sign In")} />

        <ThemedText style={{ textAlign: "center", marginTop: 16 }}>
          Don't have an account?{" "}
          <Link href='/signup' style={{ color: "#0074BE", fontWeight: "500" }}>
            Sign Up
          </Link>
        </ThemedText>
      </View>
    </ThemedView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topContent: {
    width: "90%",
    gap: 20,
  },
  tabsContent: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 6,
    gap: 16,
  },
  tabBtn: {
    flex: 1,
  },
});
