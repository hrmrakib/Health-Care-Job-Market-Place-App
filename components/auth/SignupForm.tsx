import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import ThemedInput from "../ui/ThemedInput";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import useAuthStore, { TAuthStore } from "../../store/auth/useAuthStore";

// ─── Password strength helpers ────────────────────────────────────────────────

type StrengthLevel = "Weak" | "Fair" | "Good" | "Strong" | "";

const getChecks = (password: string) => ({
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /[0-9]/.test(password),
  special: /[^A-Za-z0-9]/.test(password),
});

const getStrengthLevel = (metCount: number): StrengthLevel => {
  if (metCount === 0) return "";
  if (metCount === 1) return "Weak";
  if (metCount === 2 || metCount === 3) return "Fair";
  if (metCount === 4) return "Good";
  return "Strong";
};

const STRENGTH_COLOR: Record<StrengthLevel, string> = {
  "": "#E0E0E0",
  Weak: "#FF5A5F",
  Fair: "#FFA726",
  Good: "#66BB6A",
  Strong: "#43A047",
};

type TSignupFormProps = {
  email: string;
  password: string;
  confirmPassword: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

const SignupForm = ({ email, password, confirmPassword }: TSignupFormProps) => {
  const { theme } = useTheme();

  const setEmail = useAuthStore((s) => s.setEmail);
  const setPassword = useAuthStore((s) => s.setPassword);
  const setConfirmPassword = useAuthStore((s) => s.setConfirmPassword);

  const checks = getChecks(password);
  const metCount = Object.values(checks).filter(Boolean).length;
  const strengthLevel = getStrengthLevel(metCount);
  const strengthColor = STRENGTH_COLOR[strengthLevel];

  return (
    <View style={styles.container}>
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

      {/* ✅ FIX: Password Strength — now fully dynamic, driven by `password` state */}
      <View style={styles.strengthWrapper}>
        <View style={styles.strengthHeader}>
          <Text style={styles.strengthTitle}>Password Strength</Text>
          {strengthLevel !== "" && (
            <Text style={[styles.strengthStatus, { color: strengthColor }]}>
              {strengthLevel}
            </Text>
          )}
        </View>

        {/* 5 segmented bars — fill left-to-right based on metCount */}
        <View style={styles.barContainer}>
          {[1, 2, 3, 4, 5].map((segment) => (
            <View
              key={segment}
              style={[
                styles.bar,
                {
                  backgroundColor:
                    segment <= metCount ? strengthColor : "#E0E0E0",
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Requirements Box — each item reacts to the live password */}
      <View style={styles.requirementsBox}>
        <Text style={styles.reqTitle}>Password must contain:</Text>
        <RequirementItem text='At least 8 characters' met={checks.length} />
        <RequirementItem text='One uppercase letter' met={checks.uppercase} />
        <RequirementItem text='One lowercase letter' met={checks.lowercase} />
        <RequirementItem text='One number' met={checks.number} />
        <RequirementItem text='One special character' met={checks.special} />
      </View>

      <ThemedInput
        label='Password'
        placeholder='Enter your password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        icon={
          <Ionicons
            name='lock-closed-outline'
            size={20}
            color={theme.iconColor}
          />
        }
      />

      {/* Confirm Password */}
      <ThemedInput
        label='Confirm Password'
        placeholder='Confirm your password'
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        icon={
          <Ionicons
            name='lock-closed-outline'
            size={20}
            color={theme.iconColor}
          />
        }
      />

      {/* Mismatch hint */}
      {confirmPassword!.length > 0 && confirmPassword !== password && (
        <Text style={styles.mismatchText}>Passwords do not match</Text>
      )}
    </View>
  );
};

// ─── Requirement row ──────────────────────────────────────────────────────────

const RequirementItem = ({ text, met }: { text: string; met: boolean }) => (
  <View style={styles.reqItem}>
    <Ionicons
      name={met ? "checkmark-sharp" : "close-sharp"}
      size={16}
      color={met ? "#4CAF50" : "#999"}
    />
    <Text style={[styles.reqText, { color: met ? "#4CAF50" : "#777" }]}>
      {text}
    </Text>
  </View>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 12,
  },

  // Strength
  strengthWrapper: { marginTop: -4 },
  strengthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  strengthTitle: { fontSize: 14, fontWeight: "600", color: "#666" },
  strengthStatus: { fontSize: 12, fontWeight: "bold" },
  barContainer: { flexDirection: "row", gap: 4, height: 4 },
  bar: { flex: 1, borderRadius: 2 },

  // Requirements
  requirementsBox: {
    backgroundColor: "#F0F4F8",
    padding: 16,
    borderRadius: 12,
  },
  reqTitle: { fontWeight: "bold", marginBottom: 8, fontSize: 13 },
  reqItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  reqText: { fontSize: 13 },

  // Mismatch
  mismatchText: {
    fontSize: 12,
    color: "#FF5A5F",
    marginTop: -12,
  },
});

export default SignupForm;
