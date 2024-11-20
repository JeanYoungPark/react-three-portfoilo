import { create } from "zustand";

// 상자 상태 관리
export const useSpaceStore = create((set) => ({
    space: false,
    setSpace: (value) => set(() => ({ space: value })),
}));
