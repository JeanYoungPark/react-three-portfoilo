import { create } from "zustand";

// 상자 상태 관리
export const useChestStore = create((set) => ({
    chest: false,
    toggleChest: () => set((state) => ({ chest: !state.chest })),
}));
