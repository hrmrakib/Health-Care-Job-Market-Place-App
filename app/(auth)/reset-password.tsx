import { StyleSheet, View, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "expo-router";
import ThemedInput from "../../components/ui/ThemedInput";
import ThemedView from "../../components/ui/ThemedView";
import ThemedText from "../../components/ui/ThemedText";
import GradientButton from "../../components/shared/GradientButton";
import { useGlobalStyles } from "../../styles/globalStyles";
import SuccessPage from "../../components/shared/SuccessPage";

const ResetPasswordPage = () => {
  const globalStyles = useGlobalStyles();
  const router = useRouter();
  const { theme } = useTheme();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSuccessfullyReset, setPasswordSuccessfullyReset] =
    useState(false);

  // Requirement Logic
  const requirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One lowercase letter", met: /[a-z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
    { label: "One special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const metCount = requirements.filter((r) => r.met).length;

  if (passwordSuccessfullyReset) {
    return (
      <SuccessPage
        title='Reset Password'
        description='Your password has been successfully reset.'
        buttonTitle='Back to Login'
        onButtonPress={() => router.replace("/login")}
      />
    );
  }
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.topContent}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name='arrow-back' size={24} color={theme.iconColor} />
          </Pressable>

          <ThemedText
            title
            style={[
              globalStyles.heading,
              { color: theme.title, marginTop: 12 },
            ]}
          >
            Add New Password
          </ThemedText>
          <ThemedText style={{ marginTop: 8, color: theme.text }}>
            Add new password at least 6 digit
          </ThemedText>

          <View
            style={[styles.formWrapper, { backgroundColor: theme.surface }]}
          >
            {/* New Password */}
            <ThemedInput
              value={password}
              onChangeText={setPassword}
              label='Password'
              placeholder='Enter your password'
              secureTextEntry
              icon={
                <Ionicons
                  name='lock-closed-outline'
                  size={20}
                  color={theme.iconColor}
                />
              }
            />

            {/* Strength Meter */}
            <View style={styles.strengthHeader}>
              <ThemedText style={styles.strengthText}>
                Password Strength
              </ThemedText>
              <ThemedText
                style={{
                  color: metCount > 2 ? theme.success : theme.error,
                  fontSize: 12,
                }}
              >
                {metCount <= 2 ? "Weak" : metCount <= 4 ? "Medium" : "Strong"}
              </ThemedText>
            </View>
            <View style={styles.meterContainer}>
              {[1, 2, 3, 4, 5].map((step) => (
                <View
                  key={step}
                  style={[
                    styles.meterStep,
                    {
                      backgroundColor:
                        step <= metCount
                          ? metCount > 2
                            ? theme.success
                            : theme.error
                          : "#E7E8EA",
                    },
                  ]}
                />
              ))}
            </View>

            {/* Checklist */}
            <View
              style={[
                styles.checklistCard,
                { backgroundColor: theme.background + "80" },
              ]}
            >
              <ThemedText style={styles.checklistTitle}>
                Password must contain:
              </ThemedText>
              {requirements.map((req, index) => (
                <View key={index} style={styles.checkItem}>
                  <Ionicons
                    name={req.met ? "checkmark" : "close"}
                    size={16}
                    color={req.met ? theme.success : theme.text}
                  />
                  <ThemedText
                    style={[
                      styles.checkText,
                      { color: req.met ? theme.success : theme.text },
                    ]}
                  >
                    {req.label}
                  </ThemedText>
                </View>
              ))}
            </View>

            {/* Confirm Password */}
            <View style={{ marginTop: 20 }}>
              <ThemedInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                label='Password'
                placeholder='Enter your password'
                secureTextEntry
                icon={
                  <Ionicons
                    name='lock-closed-outline'
                    size={20}
                    color={theme.iconColor}
                  />
                }
              />
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <GradientButton
            title='Update Password'
            onPress={() => setPasswordSuccessfullyReset(true)}
            style={styles.actionBtn}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  topContent: {
    flex: 1,
  },
  backBtn: {
    marginBottom: 10,
  },
  formWrapper: {
    marginVertical: 24,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  strengthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 8,
  },
  strengthText: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.7,
  },
  meterContainer: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 20,
  },
  meterStep: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  checklistCard: {
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  checklistTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
    opacity: 0.8,
  },
  checkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkText: {
    fontSize: 12,
  },
  actions: {
    paddingBottom: 40,
    marginTop: 20,
  },
  actionBtn: {
    width: "100%",
  },
});

export default ResetPasswordPage;
