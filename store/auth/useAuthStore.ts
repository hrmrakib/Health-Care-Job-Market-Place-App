import { create } from "zustand";

export type TAuthStore = {
  email: string;
  password: string;
  confirmPassword?: string;

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  reset: () => void;
};

const useAuthStore = create<TAuthStore>((set) => ({
  email: "",
  password: "",
  confirmPassword: "",

  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  setConfirmPassword: (confirmPassword: string) => set({ confirmPassword }),
  reset: () => set({ email: "", password: "", confirmPassword: "" }),
}));

export default useAuthStore;
