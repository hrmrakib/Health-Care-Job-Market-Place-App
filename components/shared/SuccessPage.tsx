import { StyleSheet, View, Pressable, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "expo-router";
import ThemedView from "../../components/ui/ThemedView";
import ThemedText from "../../components/ui/ThemedText";
import GradientButton from "../../components/shared/GradientButton";
import { useGlobalStyles } from "../../styles/globalStyles";

interface SuccessPageProps {
  title: string;
  description: string;
  buttonTitle: string;
  onButtonPress: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({
  title,
  description,
  buttonTitle,
  onButtonPress,
}) => {
  const globalStyles = useGlobalStyles();
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color={theme.iconColor} />
        </Pressable>
      </View>

      {/* Center Content */}
      <View style={styles.centerContent}>
        <View style={[styles.iconCircle]}>
          <Image
            source={require("../../assets/success-icon.png")}
            // style={styles.icon}
            alt='success'
          />
        </View>

        <ThemedText
          title
          style={[globalStyles.heading, styles.title, { color: theme.title }]}
        >
          {title}
        </ThemedText>

        <ThemedText style={styles.description}>{description}</ThemedText>
      </View>

      {/* Bottom Action */}
      <View style={styles.actions}>
        <GradientButton
          title={buttonTitle}
          onPress={onButtonPress}
          style={styles.actionBtn}
        />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    height: 40,
    justifyContent: "center",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    // Soft shadow for the checkmark circle
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 12,
  },
  description: {
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
    opacity: 0.7,
  },
  actions: {
    width: "100%",
  },
  actionBtn: {
    width: "100%",
  },
});

export default SuccessPage;
