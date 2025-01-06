import { create } from "zustand";

const useTestStore = create((set) => ({
  value: false,
  toggleValue: () => set((state: { value: any; }) => ({ value: !state.value })),
}));

export default useTestStore;
