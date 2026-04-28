import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedView from "../../components/ui/ThemedView";
import ThemedNav from "../../components/ui/ThemedNav";
import ThemedInput from "../../components/ui/ThemedInput";
import ThemedButton from "../../components/ui/ThemedButton";
import ProgressBar from "../../components/ui/ProgressBar";
import useJobSeekerProfileStore from "../../store/user/useJobSeekerProfileStore";

export default function JobSeekerProfileStep3() {
  const router = useRouter();
  const { theme } = useTheme();

  const { education, addEducation, removeEducation } =
    useJobSeekerProfileStore();

  const [isAdding, setIsAdding] = useState(education.length === 0);

  // Form State
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState<"Completed" | "Ongoing">("Completed");
  const [licenseNumber, setLicenseNumber] = useState("");

  const handleAddEducation = () => {
    if (!degree || !institution) {
      // Basic validation
      return;
    }
    addEducation({
      degree,
      institution,
      year,
      status,
      licenseNumber,
    });
    // Reset form
    setDegree("");
    setInstitution("");
    setYear("");
    setStatus("Completed");
    setLicenseNumber("");
    setIsAdding(false);
  };

  const handleNext = () => {
    // Navigate to step 4, currently placeholder
    router.push("/job-seeker-profile/step-4" as any);
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
          <ThemedNav title='Educational Background' />
          <ProgressBar step={3} totalSteps={5} percentage={50} />

          {!isAdding && education.length === 0 ? (
            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <ThemedButton
                title='Add Education'
                onPress={() => setIsAdding(true)}
              />
            </View>
          ) : !isAdding && education.length > 0 ? (
            <View style={{ gap: 16 }}>
              {education.map((edu) => (
                <View
                  key={edu.id}
                  style={[styles.card, { backgroundColor: theme.surface }]}
                >
                  <View style={styles.eduHeader}>
                    <Text style={[styles.eduDegree, { color: theme.title }]}>
                      {edu.degree}
                    </Text>
                    <TouchableOpacity onPress={() => removeEducation(edu.id)}>
                      <Ionicons
                        name='trash-outline'
                        size={20}
                        color={theme.warning}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.eduInstitution, { color: theme.text }]}>
                    {edu.institution}
                  </Text>
                  <Text style={[styles.eduYear, { color: theme.iconColor }]}>
                    {edu.status} {edu.year ? `- ${edu.year}` : ""}
                  </Text>
                </View>
              ))}
              <ThemedButton
                title='Add Another Education'
                variant='secondary'
                onPress={() => setIsAdding(true)}
                style={{ borderWidth: 1, borderColor: theme.primary }}
                textStyle={{ color: theme.primary }}
              />
            </View>
          ) : (
            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <ThemedInput
                label='Degree / Certification Name'
                placeholder='e.g., CNA Certification'
                value={degree}
                onChangeText={setDegree}
              />

              <ThemedInput
                label='Institution Name *'
                placeholder='e.g., State College of Nursing'
                value={institution}
                onChangeText={setInstitution}
              />

              <View style={styles.yearSection}>
                <Text style={[styles.label, { color: theme.title }]}>
                  Year of Completion
                </Text>
                <ThemedInput
                  placeholder='Type Year'
                  value={year}
                  onChangeText={setYear}
                  keyboardType='numeric'
                  containerStyle={{ marginBottom: 12 }}
                />
                <View style={styles.statusButtons}>
                  <TouchableOpacity
                    style={[
                      styles.statusButton,
                      {
                        borderColor:
                          status === "Completed" ? theme.primary : theme.border,
                        backgroundColor:
                          status === "Completed"
                            ? theme.primary + "1A"
                            : "transparent",
                      },
                    ]}
                    onPress={() => setStatus("Completed")}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            status === "Completed" ? theme.primary : theme.text,
                        },
                      ]}
                    >
                      Completed
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.statusButton,
                      {
                        borderColor:
                          status === "Ongoing" ? theme.primary : theme.border,
                        backgroundColor:
                          status === "Ongoing"
                            ? theme.primary + "1A"
                            : "transparent",
                      },
                    ]}
                    onPress={() => setStatus("Ongoing")}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            status === "Ongoing" ? theme.primary : theme.text,
                        },
                      ]}
                    >
                      Ongoing
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <ThemedInput
                label='License Number (Optional)'
                placeholder='e.g., RN-123456'
                value={licenseNumber}
                onChangeText={setLicenseNumber}
              />

              <View style={styles.uploadSection}>
                <Text style={[styles.label, { color: theme.title }]}>
                  Upload Certificate{" "}
                  <Text style={{ color: theme.iconColor }}>(Optional)</Text>
                </Text>
                <TouchableOpacity
                  style={[
                    styles.uploadBox,
                    {
                      borderColor: theme.border,
                      backgroundColor: theme.navBackground,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.uploadIconWrapper,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <Ionicons
                      name='push-outline'
                      size={20}
                      color={theme.primary}
                    />
                  </View>
                  <View>
                    <Text
                      style={[styles.uploadBoxTitle, { color: theme.title }]}
                    >
                      Upload PDF or Image
                    </Text>
                    <Text
                      style={[styles.uploadBoxSub, { color: theme.iconColor }]}
                    >
                      Max file size: 5MB
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: theme.background }]}>
          {isAdding ? (
            <>
              <ThemedButton
                title='Cancel'
                variant='secondary'
                onPress={() => {
                  if (education.length === 0) {
                    router.back();
                  } else {
                    setIsAdding(false);
                  }
                }}
                style={[
                  styles.button,
                  styles.cancelButton,
                  { borderColor: theme.primary },
                ]}
                textStyle={{ color: theme.primary }}
              />
              <ThemedButton
                title='Add'
                onPress={handleAddEducation}
                style={styles.button}
              />
            </>
          ) : (
            <>
              <ThemedButton
                title='Back'
                variant='secondary'
                onPress={() => router.back()}
                style={[
                  styles.button,
                  styles.cancelButton,
                  { borderColor: theme.primary },
                ]}
                textStyle={{ color: theme.primary }}
              />
              <ThemedButton
                title='Next'
                onPress={handleNext}
                style={styles.button}
              />
            </>
          )}
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
    // padding: 8,
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
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },
  yearSection: {
    marginBottom: 20,
  },
  statusButtons: {
    flexDirection: "row",
    gap: 12,
  },
  statusButton: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  uploadSection: {
    marginTop: 8,
  },
  uploadBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  uploadIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBoxTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  uploadBoxSub: {
    fontSize: 12,
    marginTop: 2,
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
  cancelButton: {
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  eduHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  eduDegree: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eduInstitution: {
    fontSize: 14,
    marginBottom: 4,
  },
  eduYear: {
    fontSize: 12,
  },
});
