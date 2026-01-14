import { create } from "zustand";

export type PageView = "home" | "maintenance" | "library";

interface NavigationStore {
  currentPage: PageView;
  setPage: (page: PageView) => void;
  maintenanceSubMenu: string | null;
  librarySubMenu: string | null;
  setMaintenanceSubMenu: (menu: string | null) => void;
  setLibrarySubMenu: (menu: string | null) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentPage: "home",
  setPage: (page) => set({ currentPage: page }),
  maintenanceSubMenu: null,
  librarySubMenu: null,
  setMaintenanceSubMenu: (menu) => set({ maintenanceSubMenu: menu }),
  setLibrarySubMenu: (menu) => set({ librarySubMenu: menu }),
}));
