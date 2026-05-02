import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  status: "Completed" | "Ongoing";
  licenseNumber?: string;
  certificate?: string;
}

export type DocumentStatus = "required" | "valid" | "invalid" | "reviewing";

export interface DocumentItem {
  id: string;
  name: string;
  description?: string;
  status: DocumentStatus;
  fileName?: string;
  fileUri?: string;
  fileSize?: number;
}

export interface BackgroundCheckFile {
  fileName: string;
  fileUri: string;
  fileSize?: number;
}

const DEFAULT_DOCUMENTS: DocumentItem[] = [
  {
    id: "gov-id",
    name: "Gov't ID",
    description: "Government-issued photo ID",
    status: "required",
  },
  {
    id: "aging-letter",
    name: "Pennsylvania Department of Aging Letter",
    description: "State department letter",
    status: "required",
  },
  {
    id: "physical-exam",
    name: "Physical Exam and Health Assessment",
    description: "Medical clearance document",
    status: "required",
  },
  {
    id: "tb-test",
    name: "TB Test",
    description: "Tuberculosis test results",
    status: "required",
  },
  {
    id: "resume",
    name: "Resume/CV",
    description: "Upload your professional resume",
    status: "required",
  },
  {
    id: "varicella",
    name: "Varicella Text Record",
    description: "Varicella vaccination record",
    status: "required",
  },
  {
    id: "mmr",
    name: "MMR Vaccination Record",
    description: "MMR vaccination record",
    status: "required",
  },
  {
    id: "hep",
    name: "HEP Vaccination",
    description: "Hepatitis vaccination record",
    status: "required",
  },
  {
    id: "tdap",
    name: "Tdap Vaccination",
    description: "Tdap vaccination record",
    status: "required",
  },
  {
    id: "psych-nursing",
    name: "Psychiatric and Mental Health Nursing - One",
    description: "Psychiatric nursing certification",
    status: "required",
  },
];

export interface JobSeekerProfileState {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  phoneNumber: string;
  location: string;
  profilePhoto?: string;

  // Step 2: Professional Details
  professionalRole: string;
  yearsOfExperience: string;
  skills: string[];
  certifications: string[];
  bio: string;

  // Step 3: Educational Background
  education: Education[];

  // Step 4: Documents
  documents: DocumentItem[];

  // Step 5: Background Check
  backgroundCheckFile?: BackgroundCheckFile;

  // Profile completion
  profileCompleted: boolean;

  // Actions
  updatePersonalInfo: (
    data: Partial<
      Pick<
        JobSeekerProfileState,
        "firstName" | "lastName" | "phoneNumber" | "location" | "profilePhoto"
      >
    >,
  ) => void;
  updateProfessionalDetails: (
    data: Partial<
      Pick<
        JobSeekerProfileState,
        | "professionalRole"
        | "yearsOfExperience"
        | "skills"
        | "certifications"
        | "bio"
      >
    >,
  ) => void;
  addEducation: (education: Omit<Education, "id">) => void;
  removeEducation: (id: string) => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  uploadDocument: (
    id: string,
    fileName: string,
    fileUri: string,
    fileSize?: number,
  ) => void;
  removeDocument: (id: string) => void;
  updateDocumentStatus: (id: string, status: DocumentStatus) => void;
  uploadBackgroundCheck: (
    fileName: string,
    fileUri: string,
    fileSize?: number,
  ) => void;
  removeBackgroundCheck: () => void;
  completeProfile: () => void;
  getProfileCompletion: () => number;
  resetProfile: () => void;
}

const useJobSeekerProfileStore = create<JobSeekerProfileState>()(
  persist(
    (set) => ({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      location: "",
      profilePhoto: undefined,

      professionalRole: "",
      yearsOfExperience: "",
      skills: [],
      certifications: [],
      bio: "",

      education: [],

      documents: DEFAULT_DOCUMENTS,

      backgroundCheckFile: undefined,
      profileCompleted: false,

      // updatePersonalInfo: (data) => set((state) => ({ ...state, ...data })),
      updatePersonalInfo: (data) => set(data),
      updateProfessionalDetails: (data) =>
        set((state) => ({ ...state, ...data })),
      addEducation: (edu) =>
        set((state) => ({
          education: [
            ...state.education,
            { ...edu, id: Date.now().toString() },
          ],
        })),
      removeEducation: (id) =>
        set((state) => ({
          education: state.education.filter((e) => e.id !== id),
        })),
      updateEducation: (id, data) =>
        set((state) => ({
          education: state.education.map((e) =>
            e.id === id ? { ...e, ...data } : e,
          ),
        })),
      uploadDocument: (id, fileName, fileUri, fileSize) =>
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc.id === id
              ? {
                  ...doc,
                  fileName,
                  fileUri,
                  fileSize,
                  status: "reviewing" as DocumentStatus,
                }
              : doc,
          ),
        })),
      removeDocument: (id) =>
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc.id === id
              ? {
                  ...doc,
                  fileName: undefined,
                  fileUri: undefined,
                  fileSize: undefined,
                  status: "required" as DocumentStatus,
                }
              : doc,
          ),
        })),
      updateDocumentStatus: (id, status) =>
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc.id === id ? { ...doc, status } : doc,
          ),
        })),
      uploadBackgroundCheck: (fileName, fileUri, fileSize) =>
        set({
          backgroundCheckFile: { fileName, fileUri, fileSize },
        }),
      removeBackgroundCheck: () =>
        set({
          backgroundCheckFile: undefined,
        }),
      completeProfile: () =>
        set({
          profileCompleted: true,
        }),
      getProfileCompletion: () => {
        const state = useJobSeekerProfileStore.getState();
        let filled = 0;
        const total = 10; // Total checkpoints

        // Step 1: Personal Info (3 checks)
        if (state.firstName.trim()) filled++;
        if (state.lastName.trim()) filled++;
        if (state.phoneNumber.trim()) filled++;

        // Step 2: Professional Details (3 checks)
        if (state.professionalRole) filled++;
        if (state.yearsOfExperience) filled++;
        if (state.skills.length > 0) filled++;

        // Step 3: Education (1 check)
        if (state.education.length > 0) filled++;

        // Step 4: Documents (1 check - at least one uploaded)
        if (state.documents.some((d) => d.status !== "required")) filled++;

        // Step 5: Background Check (1 check)
        if (state.backgroundCheckFile) filled++;

        // Bio (1 check)
        if (state.bio.trim()) filled++;

        return Math.round((filled / total) * 100);
      },
      resetProfile: () =>
        set({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          location: "",
          profilePhoto: undefined,
          professionalRole: "",
          yearsOfExperience: "",
          skills: [],
          certifications: [],
          bio: "",
          education: [],
          documents: DEFAULT_DOCUMENTS,
          backgroundCheckFile: undefined,
          profileCompleted: false,
        }),
    }),
    {
      name: "job-seeker-profile-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useJobSeekerProfileStore;
