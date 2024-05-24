import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";
export const storage = new MMKV({
  id: "cart-storage",
});

export const ZustandStorage: StateStorage = {
  setItem: (name: string, value: string) => storage.set(name, value),
  getItem: (name: string) => storage.getString(name) || null,
  removeItem: (name: string) => storage.delete(name),
};
