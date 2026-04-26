import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import GradientButton from "../../components/shared/GradientButton";
import ThemedView from "../../components/ui/ThemedView";
import ThemedText from "../../components/ui/ThemedText";
import { useGlobalStyles } from "../../styles/globalStyles";
import { useTheme } from "../../context/ThemeContext";
import LoginForm from "../../components/auth/LoginForm";
import SignupForm from "../../components/auth/SignupForm";
import useAuthStore from "../../store/auth/useAuthStore";

const LoginPage = () => {
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const [tab, setTab] = React.useState<"login" | "signup">("login");
  const email = useAuthStore((s) => s.email);
  const password = useAuthStore((s) => s.password);
  const confirmPassword = useAuthStore((s) => s.confirmPassword);
  const reset = useAuthStore((s) => s.reset);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topContent}>
          <Image
            source={require("../../assets/splash-icon.png")}
            resizeMode='contain'
          />

          <ThemedText
            title
            style={[
              globalStyles.heading,
              styles.heading,
              { color: theme.title },
            ]}
          >
            Welcome Back {email} {password} {confirmPassword}
          </ThemedText>

          <ThemedText style={styles.description}>
            Sign in to continue your healthcare journey
          </ThemedText>

          {/* tab - login / signup */}

          <View
            style={[styles.tabsContent, { backgroundColor: theme.surface }]}
          >
            <GradientButton
              title='Login'
              onPress={() => {
                setTab("login");
                reset();
              }}
              style={styles.tabBtn}
              variant={tab === "login" ? "default" : "outlined"}
            />
            <GradientButton
              variant={tab === "signup" ? "default" : "outlined"}
              title='Sign Up'
              onPress={() => {
                setTab("signup");
                reset();
              }}
              style={styles.tabBtn}
            />
          </View>

          <View
            style={[styles.formWrapper, { backgroundColor: theme.surface }]}
          >
            {tab === "login" ? (
              <LoginForm email={email} password={password} />
            ) : (
              <SignupForm
                email={email}
                password={password}
                confirmPassword={confirmPassword!}
              />
            )}
          </View>
        </View>

        {/* action buttons */}
        <View style={styles.actions}>
          <GradientButton
            title={tab === "login" ? "Log In" : "Sign Up"}
            onPress={() => {}}
            style={styles.actionBtn}
            variant='default'
          />
        </View>

        {/* Footer */}
        <View style={styles.footerText}>
          <ThemedText>
            {tab === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </ThemedText>

          <Pressable
            onPress={() => {
              setTab(tab === "login" ? "signup" : "login");
              reset();
            }}
          >
            <ThemedText style={[styles.footerLink, { color: theme.primary }]}>
              {tab === "login" ? " Sign Up" : " Log In"}
            </ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 12,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  topContent: {
    flex: 1,
  },
  tabsContent: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 6,
    gap: 16,
    marginVertical: 20,
  },
  heading: {
    marginTop: 16,
  },
  description: {
    marginTop: 8,
  },
  formWrapper: {
    marginVertical: 20,
    padding: 10,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabBtn: {
    flex: 1,
  },
  footerText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  footerLink: {
    color: "#0074BE",
    fontWeight: "500",
    marginLeft: 4,
  },
  actions: {
    marginTop: 20,
  },
  actionBtn: {
    flex: 1,
  },
});
