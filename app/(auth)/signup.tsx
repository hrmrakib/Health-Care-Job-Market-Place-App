import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GradientButton from "../../components/shared/GradientButton";
import { useRouter } from "expo-router";

const SignUpPage = () => {
  const router = useRouter();

  return (
    <View>
      <Text>SignUpPage</Text>
      <GradientButton title='Continue' onPress={() => router.push("/login")} />
    </View>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({});
