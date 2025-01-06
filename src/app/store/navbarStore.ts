import { create } from 'zustand';

interface NavbarState {
  isOpen: boolean;
  toggleNavbar: (open:boolean) => void; 
}

const useNavbarStore = create<NavbarState>((set) => ({
  isOpen: false, 
  toggleNavbar: (open:boolean) => set((state) => ({ isOpen: open })), 
}));

export default useNavbarStore;