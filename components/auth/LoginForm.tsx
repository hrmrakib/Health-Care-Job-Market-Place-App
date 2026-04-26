import { StyleSheet, View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import ThemedInput from "../ui/ThemedInput";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import useAuthStore from "../../store/auth/useAuthStore";
import ThemedText from "../ui/ThemedText";
import { useRouter } from "expo-router";

type TLoginFormProps = {
  email: string;
  password: string;
};
const LoginForm = ({ email, password }: TLoginFormProps) => {
  const router = useRouter();
  const { theme } = useTheme();
  const setEmail = useAuthStore((s) => s.setEmail);
  const setPassword = useAuthStore((s) => s.setPassword);

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

      <Pressable onPress={() => router.push("/forgot-password")}>
        <Text style={[{ color: theme.warning }, { textAlign: "right" }]}>
          Forgot Password?
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 12,
  },
});

export default LoginForm;
