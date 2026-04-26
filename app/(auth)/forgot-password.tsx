import { StyleSheet, View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import useAuthStore from "../../store/auth/useAuthStore";
import { useRouter } from "expo-router";
import ThemedInput from "../../components/ui/ThemedInput";
import ThemedView from "../../components/ui/ThemedView";
import ThemedText from "../../components/ui/ThemedText";
import GradientButton from "../../components/shared/GradientButton";
import { useGlobalStyles } from "../../styles/globalStyles";

const ForgotPassword = () => {
  const globalStyles = useGlobalStyles();
  const router = useRouter();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");

  return (
    <ThemedView style={styles.container}>
      <View style={styles.topContent}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color={theme.iconColor} />
        </Pressable>
        <ThemedText
          title
          style={[globalStyles.heading, { color: theme.title, marginTop: 12 }]}
        >
          Forgot Password?
        </ThemedText>

        <ThemedText style={{ marginTop: 12 }}>
          No worries, you can recover your password.
        </ThemedText>

        <View style={[styles.formWrapper, { backgroundColor: theme.surface }]}>
          {/* Email */}
          <ThemedInput
            value={email}
            onChangeText={setEmail}
            label='Email'
            placeholder='Enter email address'
            keyboardType='email-address'
            autoCapitalize='none'
            icon={
              <Ionicons name='mail-outline' size={20} color={theme.iconColor} />
            }
          />
          <ThemedText
            style={[
              { color: theme.text },
              { textAlign: "left", fontSize: 10, marginTop: 10 },
            ]}
          >
            Enter your registared email or phone. Your will recived a 6 digit
            code to crew new password.
          </ThemedText>
        </View>
      </View>

      <View style={styles.actions}>
        <GradientButton
          title='Send Code'
          onPress={() => router.push("/verify")}
          style={styles.actionBtn}
          variant='default'
        />
      </View>

      <View style={styles.footerText}>
        <ThemedText>Remember your password?</ThemedText>

        <Pressable onPress={() => router.push("/login")}>
          <ThemedText style={[styles.footerLink, { color: theme.primary }]}>
            Log In
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  formWrapper: {
    marginVertical: 32,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topContent: {
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
    width: "100%",
  },
});

export default ForgotPassword;
