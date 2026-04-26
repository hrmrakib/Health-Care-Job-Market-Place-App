import { StyleSheet, View, Pressable, TextInput } from "react-native";
import React, { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "expo-router";
import ThemedView from "../../components/ui/ThemedView";
import ThemedText from "../../components/ui/ThemedText";
import GradientButton from "../../components/shared/GradientButton";
import { useGlobalStyles } from "../../styles/globalStyles";

const VerifyOtpPage = () => {
  const globalStyles = useGlobalStyles();
  const router = useRouter();
  const { theme } = useTheme();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Refs to manage focus
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];

    // Handle pasting more than 1 character
    if (text.length > 1) {
      const pastedData = text.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedData[i] || "";
      }
      setOtp(newOtp);
      // Focus the last filled box or the last box in general
      const lastIndex = Math.min(pastedData.length - 1, 5);
      inputs.current[lastIndex]?.focus();
      return;
    }

    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next field
    if (text !== "" && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous field on backspace if current field is empty
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.topContent}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name='arrow-back' size={24} color={theme.iconColor} />
        </Pressable>

        <ThemedText
          title
          style={[globalStyles.heading, { color: theme.title, marginTop: 12 }]}
        >
          Verify Code
        </ThemedText>

        <View style={styles.subHeadingRow}>
          <ThemedText style={styles.description}>
            We've sent a verification code to{" "}
          </ThemedText>
          <ThemedText style={{ color: theme.primary, fontWeight: "600" }}>
            john@comp***.com
          </ThemedText>
        </View>

        <View style={[styles.formWrapper, { backgroundColor: theme.surface }]}>
          <ThemedText style={styles.label}>Enter OTP</ThemedText>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputs.current[index] = ref;
                }}
                style={[
                  styles.otpBox,
                  {
                    borderColor: otp[index] ? theme.primary : "transparent",
                    color: theme.text,
                    backgroundColor: theme.background,
                  },
                ]}
                maxLength={index === 0 ? 6 : 1} // Allow pasting on the first box
                keyboardType='number-pad'
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                value={digit}
                textAlign='center'
                contextMenuHidden={false} // Allow paste menu
                selectTextOnFocus
                placeholder='.'
              />
            ))}
          </View>

          <View style={styles.resendContainer}>
            <ThemedText style={{ color: theme.text }}>
              Didn't receive the code?{" "}
            </ThemedText>
            <Pressable onPress={() => alert("Resending...")}>
              <ThemedText style={{ color: theme.primary, fontWeight: "600" }}>
                Resent Code
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <GradientButton
          title='Verify Now'
          onPress={() => router.push("/reset-password")}
          style={styles.actionBtn}
          variant='default'
        />
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
  topContent: {
    flex: 1,
  },
  backBtn: {
    marginBottom: 10,
  },
  subHeadingRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  description: {
    color: "#666",
  },
  formWrapper: {
    marginVertical: 32,
    paddingHorizontal: 16,
    paddingVertical: 30,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    alignItems: "center",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 15,
    fontWeight: "500",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1.5,
    borderRadius: 16,
    fontSize: 20,
    fontWeight: "600",
  },
  resendContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  actions: {
    width: "100%",
  },
  actionBtn: {
    width: "100%",
  },
});

export default VerifyOtpPage;
