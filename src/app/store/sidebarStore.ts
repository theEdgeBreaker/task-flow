import { create } from "zustand";

type SidebarState = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true, // Default open
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));
