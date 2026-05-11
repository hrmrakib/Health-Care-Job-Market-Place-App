import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import ThemedView from "../../components/ui/ThemedView";
import HeaderBar from "../../components/employer/HeaderBar";
import ThemedInput from "../../components/ui/ThemedInput";
import ThemedSelect from "../../components/ui/ThemedSelect";
import InviteEmployeeSelect from "../../components/employer/InviteEmployeeSelect";
import ShiftSelector from "../../components/employer/ShiftSelector";
import DatePickerField from "../../components/employer/DatePickerField";
import GradientButton from "../../components/shared/GradientButton";
import { useRouter } from "expo-router";

const MOCK_EMPLOYEES = ["Akash", "Batash", "Patal", "Mati", "Ghor", "Macha"];

const CreateJob = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const [jobTitle, setJobTitle] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>(["Mati", "Ghor", "Macha"]);
  const [roleType, setRoleType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [shiftType, setShiftType] = useState<"Day" | "Night">("Night");
  const [timing, setTiming] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>(["Su"]);
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const handleToggleEmployee = (name: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(name)
        ? prev.filter((e) => e !== name)
        : [...prev, name]
    );
  };

  const handleToggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <HeaderBar
        title="Post a Job"
        subtitle="Fill in the details to post a new job."
        showBackButton
        onBack={() => router.back()}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedInput
            label="Job Title"
            placeholder="e.g., ICU Registered Nurse"
            value={jobTitle}
            onChangeText={setJobTitle}
          />

          <ThemedInput
            label="Vacancy"
            placeholder="e.g. 10 employees"
            value={vacancy}
            onChangeText={setVacancy}
          />

          <InviteEmployeeSelect
            label="Invite Employees"
            allEmployees={MOCK_EMPLOYEES}
            selectedEmployees={selectedEmployees}
            onToggleEmployee={handleToggleEmployee}
          />

          <ThemedSelect
            label="Role Type"
            placeholder="Select your role"
            value={roleType}
            onSelect={setRoleType}
            options={[
              { label: "CNA", value: "cna" },
              { label: "Registered Nurse", value: "rn" },
              { label: "LPN", value: "lpn" },
            ]}
          />

          <ThemedInput
            label="Location"
            placeholder="Enter location"
            value={location}
            onChangeText={setLocation}
          />

          <DatePickerField
            label="Date"
            value={date}
            onPress={() => {
              // Usually opens a modal or picker
              setDate("12 March, 2026");
            }}
          />

          <ShiftSelector
            label="Shift"
            shiftType={shiftType}
            onShiftTypeChange={setShiftType}
            timing={timing}
            onTimingChange={setTiming}
            selectedDays={selectedDays}
            onToggleDay={handleToggleDay}
          />

          <ThemedInput
            label="Salary"
            placeholder="e.g $50"
            value={salary}
            onChangeText={setSalary}
          />

          <ThemedInput
            label="Job Description"
            placeholder="Describe the job details"
            value={description}
            onChangeText={setDescription}
            multiline
            containerStyle={{ height: 120 }}
          />

          <GradientButton
            title="Post Job"
            onPress={() => router.back()}
            style={styles.postBtn}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default CreateJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  postBtn: {
    marginTop: 20,
    marginBottom: 40,
  },
});
