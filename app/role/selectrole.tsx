import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ThemedView from "../../components/ui/ThemedView";
import ThemedText from "../../components/ui/ThemedText";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalStyles } from "../../styles/globalStyles";
import GradientButton from "../../components/shared/GradientButton";
import { useRouter } from "expo-router";

const SelectYourRolePage = () => {
  const { theme } = useTheme();
  const [selectedRole, setSelectedRole] = useState<"professional" | "employer">(
    "professional",
  );
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.topContent}>
        <Image
          source={require("../../assets/splash-icon.png")}
          style={styles.logo}
          resizeMode='contain'
        />

        <ThemedText title style={useGlobalStyles().heading}>
          Welcome to Medistaff
        </ThemedText>

        <ThemedText style={styles.description}>
          Let's personalize your experience. How do you want to use the app?
        </ThemedText>

        {/* Selection Cards */}
        <RoleCard
          title='Healthcare Professional'
          subtitle='I am looking for jobs'
          description='Find healthcare positions that match your skills and experience'
          icon='stethoscope'
          selected={selectedRole === "professional"}
          onPress={() => setSelectedRole("professional")}
        />

        <RoleCard
          title='Employer'
          subtitle='I am hiring'
          description='Post jobs and connect with qualified healthcare professionals'
          icon='business'
          selected={selectedRole === "employer"}
          onPress={() => setSelectedRole("employer")}
        />
      </View>

      <GradientButton title='Continue' onPress={() => router.push("/login")} />
    </ThemedView>
  );
};

// Helper component for the Selection Cards
const RoleCard = ({
  title,
  subtitle,
  description,
  selected,
  onPress,
  icon,
}: any) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: selected ? "#27AE60" : "transparent",
          borderWidth: 2,
        },
      ]}
    >
      <View
        style={[
          styles.iconBox,
          { backgroundColor: selected ? "#27AE60" : "#e5e7eb" },
        ]}
      >
        <Ionicons
          name={icon}
          size={24}
          color={selected ? "white" : "#6b7280"}
        />
      </View>

      <View style={styles.cardTextContainer}>
        <ThemedText style={useGlobalStyles().title} title>
          {title}
        </ThemedText>
        <ThemedText style={[styles.cardSubtitle, { color: theme.primary }]}>
          {subtitle}
        </ThemedText>
        <ThemedText style={styles.cardDescription}>{description}</ThemedText>
      </View>

      {selected && (
        <View style={styles.checkIcon}>
          <Ionicons name='checkmark-circle' size={24} color='#27AE60' />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  topContent: {
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 30,
    opacity: 0.8,
  },
  card: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 2,
  },
  cardDescription: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  checkIcon: {
    marginLeft: 10,
  },
  footer: {
    marginTop: 20,
  },
});

export default SelectYourRolePage;
