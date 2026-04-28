import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import ThemedView from "../../components/ui/ThemedView";
import ThemedNav from "../../components/ui/ThemedNav";
import ThemedText from "../../components/ui/ThemedText";
import ThemedInput from "../../components/ui/ThemedInput";
import ThemedButton from "../../components/ui/ThemedButton";
import ProgressBar from "../../components/ui/ProgressBar";
import useJobSeekerProfileStore from "../../store/user/useJobSeekerProfileStore";

export default function JobSeekerProfileStep1() {
  const router = useRouter();
  const { theme } = useTheme();

  const { firstName, lastName, phoneNumber, location, updatePersonalInfo } =
    useJobSeekerProfileStore();

  const handleNext = () => {
    // Basic validation could go here
    router.push("/job-seeker-profile/step-2");
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedNav title='Personal Information' />
          <ProgressBar step={1} totalSteps={5} percentage={25} />

          <View style={[styles.card, { backgroundColor: theme.surface }]}>
            <View style={styles.photoUploadContainer}>
              <View
                style={[styles.photoPlaceholder, { borderColor: theme.border }]}
              >
                <Ionicons
                  name='person-outline'
                  size={40}
                  color={theme.primary}
                />
                <TouchableOpacity
                  style={[
                    styles.cameraButton,
                    { backgroundColor: theme.primary },
                  ]}
                >
                  <Ionicons name='camera' size={16} color='#fff' />
                </TouchableOpacity>
              </View>
              <ThemedText style={styles.uploadText}>
                Upload profile photo
              </ThemedText>
            </View>

            <ThemedInput
              label='First Name'
              placeholder='Enter your name'
              value={firstName}
              onChangeText={(text) => updatePersonalInfo({ firstName: text })}
              icon={
                <Ionicons
                  name='person-outline'
                  size={20}
                  color={theme.iconColor}
                />
              }
            />

            <ThemedInput
              label='Last Name'
              placeholder='Enter last name'
              value={lastName}
              onChangeText={(text) => updatePersonalInfo({ lastName: text })}
              icon={
                <Ionicons
                  name='person-outline'
                  size={20}
                  color={theme.iconColor}
                />
              }
            />

            <ThemedInput
              label='Phone Number'
              placeholder='Enter your phone number'
              value={phoneNumber}
              onChangeText={(text) => updatePersonalInfo({ phoneNumber: text })}
              keyboardType='phone-pad'
              icon={
                <Ionicons
                  name='call-outline'
                  size={20}
                  color={theme.iconColor}
                />
              }
            />

            <ThemedInput
              label='Location'
              placeholder='Enter your name' // Placeholder follows the design literally
              value={location}
              onChangeText={(text) => updatePersonalInfo({ location: text })}
              icon={
                <Ionicons
                  name='location-outline'
                  size={20}
                  color={theme.iconColor}
                />
              }
            />

            <ThemedText style={[styles.secureNote, { color: theme.iconColor }]}>
              Your information is secure and will never be shared
            </ThemedText>
          </View>
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: theme.background }]}>
          <ThemedButton
            title='Next'
            onPress={handleNext}
            style={styles.nextButton}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: "#0000008b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  photoUploadContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    position: "relative",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  uploadText: {
    fontSize: 14,
  },
  secureNote: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 8,
  },
  footer: {
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 32 : 16,
  },
  nextButton: {
    width: "100%",
  },
});
