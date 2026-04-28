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

  // Actions
  updatePersonalInfo: (data: Partial<Pick<JobSeekerProfileState, "firstName" | "lastName" | "phoneNumber" | "location" | "profilePhoto">>) => void;
  updateProfessionalDetails: (data: Partial<Pick<JobSeekerProfileState, "professionalRole" | "yearsOfExperience" | "skills" | "certifications" | "bio">>) => void;
  addEducation: (education: Omit<Education, "id">) => void;
  removeEducation: (id: string) => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
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

      updatePersonalInfo: (data) => set((state) => ({ ...state, ...data })),
      updateProfessionalDetails: (data) => set((state) => ({ ...state, ...data })),
      addEducation: (edu) => set((state) => ({
        education: [...state.education, { ...edu, id: Date.now().toString() }],
      })),
      removeEducation: (id) => set((state) => ({
        education: state.education.filter((e) => e.id !== id),
      })),
      updateEducation: (id, data) => set((state) => ({
        education: state.education.map((e) => (e.id === id ? { ...e, ...data } : e)),
      })),
      resetProfile: () => set({
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
      }),
    }),
    {
      name: "job-seeker-profile-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useJobSeekerProfileStore;
