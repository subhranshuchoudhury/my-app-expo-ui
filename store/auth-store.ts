import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ZustandStorage } from "./mmkv-storage";

export interface AuthStore {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      removeToken: () => set({ token: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => ZustandStorage),
    }
  )
);

export default useAuthStore;
