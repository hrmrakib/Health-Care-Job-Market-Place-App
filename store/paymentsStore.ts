import { create } from 'zustand';

/** Payment status of a job */
export type PaymentJobStatus = 'ongoing' | 'completed';

/** A single payment job entry */
export interface PaymentJob {
  id: string;
  title: string;
  role: string;
  status: PaymentJobStatus;
  location: string;
  employeesAssigned: number;
  ratePerHour: number;
  shift: string;
  shiftType: string;
  date: string;
  timeRemaining: string;
  imageUri?: string;
}

interface PaymentsState {
  /** Current digital wallet balance */
  walletBalance: number;
  /** Summary stats */
  totalPaid: number;
  pendingCount: number;
  completedCount: number;
  /** Payment job lists */
  pendingJobs: PaymentJob[];
  completedJobs: PaymentJob[];
  /** Add funds to the wallet */
  addFunds: (amount: number) => void;
  /** Remove a completed payment job by id */
  deleteCompletedJob: (id: string) => void;
}

const mockPendingJobs: PaymentJob[] = [
  {
    id: 'pj_1',
    title: 'Job Title',
    role: 'CNA',
    status: 'ongoing',
    location: 'Los Angeles, CA',
    employeesAssigned: 10,
    ratePerHour: 22,
    shift: 'Night Shift',
    shiftType: 'Full-time',
    date: '12 March, 2026',
    timeRemaining: '2h remaining',
    imageUri: 'https://i.pravatar.cc/150?u=job1',
  },
  {
    id: 'pj_2',
    title: 'Job Title',
    role: 'RN',
    status: 'ongoing',
    location: 'San Francisco, CA',
    employeesAssigned: 5,
    ratePerHour: 35,
    shift: 'Morning Shift',
    shiftType: 'Part-time',
    date: '15 March, 2026',
    timeRemaining: '4h remaining',
    imageUri: 'https://i.pravatar.cc/150?u=job2',
  },
];

const mockCompletedJobs: PaymentJob[] = [
  {
    id: 'cj_1',
    title: 'Job Title',
    role: 'CNA',
    status: 'completed',
    location: 'Los Angeles, CA',
    employeesAssigned: 10,
    ratePerHour: 22,
    shift: 'Night Shift',
    shiftType: 'Full-time',
    date: '12 March, 2026',
    timeRemaining: '2h remaining',
    imageUri: 'https://i.pravatar.cc/150?u=job3',
  },
  {
    id: 'cj_2',
    title: 'Job Title',
    role: 'LPN',
    status: 'completed',
    location: 'Chicago, IL',
    employeesAssigned: 8,
    ratePerHour: 28,
    shift: 'Evening Shift',
    shiftType: 'Full-time',
    date: '10 March, 2026',
    timeRemaining: '6h remaining',
    imageUri: 'https://i.pravatar.cc/150?u=job4',
  },
];

export const usePaymentsStore = create<PaymentsState>((set) => ({
  walletBalance: 1250,
  totalPaid: 1221,
  pendingCount: 10,
  completedCount: 25,
  pendingJobs: mockPendingJobs,
  completedJobs: mockCompletedJobs,

  addFunds: (amount) =>
    set((state) => ({
      walletBalance: state.walletBalance + amount,
    })),

  deleteCompletedJob: (id) =>
    set((state) => ({
      completedJobs: state.completedJobs.filter((j) => j.id !== id),
      completedCount: Math.max(0, state.completedCount - 1),
    })),
}));
