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
import ThemedInput from "../../components/ui/ThemedInput";
import ThemedButton from "../../components/ui/ThemedButton";
import ProgressBar from "../../components/ui/ProgressBar";
import ThemedSelect from "../../components/ui/ThemedSelect";
import TagsInput from "../../components/ui/TagsInput";
import useJobSeekerProfileStore from "../../store/user/useJobSeekerProfileStore";

const ROLE_OPTIONS = [
  { label: "Doctor", value: "Doctor" },
  { label: "Nurse", value: "Nurse" },
  { label: "Certified Nursing Assistant (CNA)", value: "CNA" },
  { label: "Physician Assistant", value: "Physician Assistant" },
  { label: "Nurse Practitioner", value: "Nurse Practitioner" },
  { label: "Dietary", value: "Dietary" },
  { label: "Housekeeping", value: "Housekeeping" },
  { label: "Phlebotomist", value: "Phlebotomist" },
  { label: "Laundry", value: "Laundry" },
];

const EXPERIENCE_OPTIONS = [
  { label: "0-1 years", value: "0-1" },
  { label: "1-3 years", value: "1-3" },
  { label: "3-5 years", value: "3-5" },
  { label: "5+ years", value: "5+" },
];

const SUGGESTED_SKILLS = [
  "Patient Care",
  "Vital Signs",
  "CPR",
  "IV Therapy",
  "Wound Care",
  "Medical Records",
];

const SUGGESTED_CERTIFICATIONS = [
  "BLS",
  "ACLS",
  "PALS",
  "RN License",
  "CNA License",
  "CPR Certified",
];

export default function JobSeekerProfileStep2() {
  const router = useRouter();
  const { theme } = useTheme();

  const {
    professionalRole,
    yearsOfExperience,
    skills,
    certifications,
    bio,
    updateProfessionalDetails,
  } = useJobSeekerProfileStore();

  const handleNext = () => {
    // Validation logic could go here
    router.push("/job-seeker-profile/step-3");
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
          <ThemedNav title='Professional Details' />
          <ProgressBar step={2} totalSteps={5} percentage={50} />

          <View style={[styles.card, { backgroundColor: theme.surface }]}>
            <ThemedSelect
              label='Professional Role'
              placeholder='Select your role'
              value={professionalRole}
              options={ROLE_OPTIONS}
              onSelect={(val) =>
                updateProfessionalDetails({ professionalRole: val })
              }
              icon={
                <Ionicons
                  name='briefcase-outline'
                  size={20}
                  color={theme.iconColor}
                />
              }
            />

            <ThemedSelect
              label='Years of Experience'
              placeholder='Select experience level'
              value={yearsOfExperience}
              options={EXPERIENCE_OPTIONS}
              onSelect={(val) =>
                updateProfessionalDetails({ yearsOfExperience: val })
              }
              icon={
                <Ionicons
                  name='star-outline'
                  size={20}
                  color={theme.iconColor}
                />
              }
            />

            <TagsInput
              label='Skills'
              placeholder='Type a skill and press Enter'
              tags={skills}
              suggestedTags={SUGGESTED_SKILLS}
              onAddTag={(tag) =>
                updateProfessionalDetails({ skills: [...skills, tag] })
              }
              onRemoveTag={(tag) =>
                updateProfessionalDetails({
                  skills: skills.filter((s) => s !== tag),
                })
              }
            />

            <TagsInput
              label='Certifications'
              placeholder='Type a certification and press Enter'
              tags={certifications}
              suggestedTags={SUGGESTED_CERTIFICATIONS}
              onAddTag={(tag) =>
                updateProfessionalDetails({
                  certifications: [...certifications, tag],
                })
              }
              onRemoveTag={(tag) =>
                updateProfessionalDetails({
                  certifications: certifications.filter((c) => c !== tag),
                })
              }
            />

            <ThemedInput
              label='Add Bio'
              placeholder='Write here'
              value={bio}
              onChangeText={(text) => updateProfessionalDetails({ bio: text })}
              multiline
              numberOfLines={4}
              containerStyle={{ marginBottom: 0 }}
              inputStyle={{
                height: 100,
                textAlignVertical: "top",
                paddingTop: 12,
              }}
            />
          </View>
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: theme.background }]}>
          <ThemedButton
            title='Back'
            variant='secondary'
            onPress={() => router.back()}
            style={[
              styles.button,
              styles.backButton,
              { borderColor: theme.primary },
            ]}
            textStyle={{ color: theme.primary }}
          />
          <ThemedButton
            title='Next'
            onPress={handleNext}
            style={styles.button}
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
  navButton: {
    padding: 8,
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
  footer: {
    flexDirection: "row",
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 32 : 16,
    gap: 16,
  },
  button: {
    flex: 1,
  },
  backButton: {
    borderWidth: 1,
    backgroundColor: "transparent",
  },
});
