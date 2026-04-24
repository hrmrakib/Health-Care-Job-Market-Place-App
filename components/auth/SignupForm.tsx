import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedView from "../ui/ThemedView";
import ThemedInput from "../ui/ThemedInput";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "expo-router";
import LoginForm from "./LoginForm";

const SignupForm = () => {
  const { theme } = useTheme();

  return (
    <ThemedView style={[styles.container, { backgroundColor: "transparent" }]}>
      <View style={styles.form}>
        <ThemedInput
          label='Email'
          placeholder='Enter email address'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          textContentType='emailAddress'
          icon={
            <Ionicons name='mail-outline' size={20} color={theme.iconColor} />
          }
        />

        <ThemedInput
          label='Password'
          placeholder='Enter your password'
          secureTextEntry
          autoCapitalize='none'
          autoCorrect={false}
          textContentType='password'
          onFocus={() => console.log("Focused")}
          icon={
            <Ionicons
              name='lock-closed-outline'
              size={20}
              color={theme.iconColor}
            />
          }
        />
        <ThemedInput
          label='Password'
          placeholder='Enter your password'
          secureTextEntry
          autoCapitalize='none'
          autoCorrect={false}
          textContentType='password'
          onFocus={() => console.log("Focused")}
          icon={
            <Ionicons
              name='lock-closed-outline'
              size={20}
              color={theme.iconColor}
            />
          }
        />

        <Link href='/forgot-password' style={{ alignSelf: "flex-end" }}>
          <Text style={{ color: theme.warning }}>Forgot Password?</Text>
        </Link>
      </View>
    </ThemedView>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  form: {
    width: "100%",
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
});
