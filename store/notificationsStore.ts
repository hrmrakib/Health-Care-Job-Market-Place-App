import { create } from 'zustand';

/** Supported notification categories */
export type NotificationCategory =
  | 'job_post'
  | 'candidate_application'
  | 'hiring'
  | 'payment'
  | 'admin'
  | 'job_status'
  | 'application_update'
  | 'interview'
  | 'profile_view'
  | 'job_match';

export interface Notification {
  id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  isRead: boolean;
  timestamp: string;
  /** Role this notification belongs to */
  role: 'employer' | 'job_seeker';
}

interface NotificationsState {
  notifications: Notification[];
  dismissNotification: (id: string) => void;
  markAllRead: (role: 'employer' | 'job_seeker') => void;
  getByRole: (role: 'employer' | 'job_seeker') => Notification[];
  getNewCount: (role: 'employer' | 'job_seeker') => number;
}

/** Color dot mapping per category */
export const categoryColors: Record<NotificationCategory, string> = {
  job_post: '#27AE60',           // green
  candidate_application: '#F59E0B', // amber
  hiring: '#EF4444',             // red-pink
  payment: '#F59E0B',            // amber
  admin: '#F59E0B',              // amber
  job_status: '#F59E0B',         // amber
  application_update: '#27AE60', // green
  interview: '#3B82F6',          // blue
  profile_view: '#8B5CF6',       // purple
  job_match: '#27AE60',          // green
};

/** Category display labels */
export const categoryLabels: Record<NotificationCategory, string> = {
  job_post: 'Job Post',
  candidate_application: 'Candidate Application',
  hiring: 'Hiring',
  payment: 'Payment & Earnings',
  admin: 'Admin/Platform',
  job_status: 'Job Status & Alerts',
  application_update: 'Application Update',
  interview: 'Interview',
  profile_view: 'Profile View',
  job_match: 'Job Match',
};

/** Mock employer notifications matching the provided design */
const mockEmployerNotifications: Notification[] = [
  {
    id: 'en_1',
    category: 'job_post',
    title: 'Job Post',
    message: "Your job post for 'Registered Nurse – Night Shift' has been successfully published",
    isRead: false,
    timestamp: '2m ago',
    role: 'employer',
  },
  {
    id: 'en_2',
    category: 'candidate_application',
    title: 'Candidate Application',
    message: "Dr. Sarah Khan has applied for your job 'General Physician – Morning Shift'",
    isRead: false,
    timestamp: '15m ago',
    role: 'employer',
  },
  {
    id: 'en_3',
    category: 'hiring',
    title: 'Hiring',
    message: "You have successfully hired John Doe for the job 'Pediatric Nurse – 8 AM to 4 PM.",
    isRead: false,
    timestamp: '1h ago',
    role: 'employer',
  },
  {
    id: 'en_4',
    category: 'payment',
    title: 'Payment & Earnings',
    message: "$300 has been successfully credited to your employee's account for completed shifts.",
    isRead: true,
    timestamp: '3h ago',
    role: 'employer',
  },
  {
    id: 'en_5',
    category: 'admin',
    title: 'Admin/Platform',
    message: 'Your platform commission of $100 has been deducted from the recent transaction.',
    isRead: true,
    timestamp: '5h ago',
    role: 'employer',
  },
  {
    id: 'en_6',
    category: 'job_status',
    title: 'Job Status & Alerts',
    message: "Urgent job alert: Only 1 candidate applied to your 'ICU Nurse – 1 Hour Notice' job",
    isRead: true,
    timestamp: '1d ago',
    role: 'employer',
  },
];

/** Mock job seeker notifications */
const mockJobSeekerNotifications: Notification[] = [
  {
    id: 'jn_1',
    category: 'application_update',
    title: 'Application Update',
    message: "Your application for 'Registered Nurse – Night Shift' at Stanford Medical Center has been reviewed.",
    isRead: false,
    timestamp: '5m ago',
    role: 'job_seeker',
  },
  {
    id: 'jn_2',
    category: 'interview',
    title: 'Interview Scheduled',
    message: "Stanford Medical Center has scheduled an interview for 'General Physician' on Thursday at 2:00 PM.",
    isRead: false,
    timestamp: '30m ago',
    role: 'job_seeker',
  },
  {
    id: 'jn_3',
    category: 'job_match',
    title: 'Job Match',
    message: "New job match: 'ICU Nurse – Morning Shift' at City Hospital matches your profile perfectly.",
    isRead: false,
    timestamp: '2h ago',
    role: 'job_seeker',
  },
  {
    id: 'jn_4',
    category: 'hiring',
    title: 'Hiring Confirmation',
    message: "Congratulations! You have been hired for the 'Pediatric Nurse – 8 AM to 4 PM' position.",
    isRead: true,
    timestamp: '4h ago',
    role: 'job_seeker',
  },
  {
    id: 'jn_5',
    category: 'profile_view',
    title: 'Profile View',
    message: 'Your profile was viewed by 5 employers in the last 24 hours. Keep your profile updated!',
    isRead: true,
    timestamp: '6h ago',
    role: 'job_seeker',
  },
  {
    id: 'jn_6',
    category: 'payment',
    title: 'Payment Received',
    message: '$420 has been successfully deposited to your account for your completed shift at City Hospital.',
    isRead: true,
    timestamp: '2d ago',
    role: 'job_seeker',
  },
];

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: [...mockEmployerNotifications, ...mockJobSeekerNotifications],

  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  markAllRead: (role) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.role === role ? { ...n, isRead: true } : n
      ),
    })),

  getByRole: (role) => get().notifications.filter((n) => n.role === role),

  getNewCount: (role) =>
    get().notifications.filter((n) => n.role === role && !n.isRead).length,
}));
