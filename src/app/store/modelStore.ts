// store/modalStore.ts
import { create } from "zustand";
import { ModalState } from "../types/user";

const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  openModal: () => {
    console.log("Modal is opening...");
    set({ isModalOpen: true });
  },
  closeModal: () => {
    console.log("Modal is closing...");
    set({ isModalOpen: false });
  },
}));

export default useModalStore;
