import { create } from "zustand";

// 문 상태 관리
export const useDoorStore = create((set) => ({
    door: false,
    toggleDoor: () => set((state) => ({ door: !state.door })),
}));
