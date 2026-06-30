import { create } from 'zustand';

/** Represents an employer's company profile */
export interface EmployerProfile {
  id: string;
  companyName: string;
  companyLogo?: string;
  location: string;
  rating: number;
  description: string;
  email: string;
  phone: string;
  ongoingJobs: number;
  completedJobs: number;
}

interface EmployerProfileState {
  profile: EmployerProfile;
  isLoading: boolean;
  error: string | null;
  updateProfile: (updates: Partial<EmployerProfile>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

/** Mock employer profile data matching the provided design */
const mockProfile: EmployerProfile = {
  id: 'emp_1',
  companyName: 'Stanford Medical Center',
  companyLogo: 'https://i.pravatar.cc/150?u=stanford_med',
  location: 'San Francisco, CA',
  rating: 4.8,
  description:
    'Stanford Medicine is a leading academic health system providing world-class patient care, groundbreaking research, and innovative medical education.',
  email: 'sarah.johnson@email.com',
  phone: '+1 (415) 555-0123',
  ongoingJobs: 12,
  completedJobs: 34,
};

export const useEmployerProfileStore = create<EmployerProfileState>((set) => ({
  profile: mockProfile,
  isLoading: false,
  error: null,
  updateProfile: (updates) =>
    set((state) => ({
      profile: { ...state.profile, ...updates },
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
