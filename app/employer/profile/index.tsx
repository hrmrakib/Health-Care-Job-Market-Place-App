import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import ThemedView from "../../../components/ui/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../context/ThemeContext";
import Feather from "@expo/vector-icons/Feather";
import ThemedText from "../../../components/ui/ThemedText";
import { useGlobalStyles } from "../../../styles/globalStyles";
import ThemedInput from "../../../components/ui/ThemedInput";
import GradientButton from "../../../components/shared/GradientButton";

interface IFormData {
  companyName: string;
  companyLogo: File | null;
  companyLocation: string;
  contactNumber: string;
  description: string;
}

const ProfilePage = () => {
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const [formData, setFormData] = useState<IFormData>({
    companyName: "",
    companyLogo: null,
    companyLocation: "",
    contactNumber: "",
    description: "",
  });

  const handleNext = () => {
    // navigate to next page
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* header */}
          <View style={styles.header}>
            <ThemedText style={globalStyles.title}>
              Company Profile Setup
            </ThemedText>
            <ThemedText style={{ marginTop: 8 }}>
              Tell us about your healthcare organization
            </ThemedText>
          </View>
          {/* profile card */}
          <View
            style={[styles.profileCard, { backgroundColor: theme.surface }]}
          >
            {/* upload photo */}
            <View style={styles.photoUploadContainer}>
              <ThemedText style={styles.photoPlaceholderText}>
                Company Logo
              </ThemedText>
              <View style={styles.photoPlaceholderWrapper}>
                <View
                  style={[
                    styles.photoPlaceholder,
                    { backgroundColor: theme.surface || "#fff" },
                  ]}
                >
                  <TouchableOpacity style={{ alignItems: "center" }}>
                    <Feather name='upload' size={42} color={theme.text} />
                    <ThemedText style={{ color: theme.text, marginTop: 8 }}>
                      Upload Logo
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              <ThemedText style={{ marginTop: 6, textAlign: "center" }}>
                {" "}
                PNG, JPG up to 5MB{" "}
              </ThemedText>
            </View>

            <View style={styles.formWrapper}>
              <ThemedInput
                label='Company Name'
                placeholder='e.g., City Hospital'
                value={formData.companyName}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, companyName: text }))
                }
                icon={
                  <Ionicons
                    name='business-outline'
                    size={20}
                    color={theme.iconColor}
                  />
                }
              />

              <ThemedInput
                label='Company Location'
                placeholder='e.g., San Francisco, CA'
                value={formData.companyLocation}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, companyLocation: text }))
                }
                icon={
                  <Ionicons
                    name='location-outline'
                    size={20}
                    color={theme.iconColor}
                  />
                }
              />
              <ThemedInput
                label='Contact Number'
                placeholder='e.g., (555) 123-4567'
                value={formData.contactNumber}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, contactNumber: text }))
                }
                icon={
                  <Ionicons
                    name='call-outline'
                    size={20}
                    color={theme.iconColor}
                  />
                }
              />
              <ThemedInput
                label='Company Description'
                placeholder='Tell healthcare professionals about your organization, culture, and what makes you a great place to work...'
                multiline
                value={formData.contactNumber}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, contactNumber: text }))
                }
              />

              <ThemedText
                style={{ marginTop: 12, textAlign: "center", fontSize: 14 }}
              >
                Your information is secure and will never be shared
              </ThemedText>
            </View>
          </View>

          <View style={styles.actions}>
            <GradientButton
              title='Save & Continue'
              // onPress={() => router.push("/verify")}
              style={styles.actionBtn}
              variant='default'
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 24,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  profileCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: "#0000008b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  photoUploadContainer: {
    marginBottom: 24,
  },
  photoPlaceholderText: {
    textAlign: "left",
    fontWeight: "600",
  },
  photoPlaceholderWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    paddingBottom: 10,
    overflow: "hidden",
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#b9b4b4",
    borderStyle: "dashed",

    // iOS Shadows
    shadowColor: "#00000097",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    // Android Shadow
    elevation: 5,

    // 2. ENSURE OVERFLOW IS VISIBLE
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  formWrapper: {
    marginTop: 8,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  actions: {
    marginTop: 20,
  },
  actionBtn: {
    width: "100%",
  },
});
