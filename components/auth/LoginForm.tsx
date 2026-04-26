import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import ThemedInput from "../ui/ThemedInput";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import useAuthStore from "../../store/auth/useAuthStore";

type TLoginFormProps = {
  email: string;
  password: string;
};
const LoginForm = ({ email, password }: TLoginFormProps) => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", padding: 20, gap: 20 },
});

export default LoginForm;
