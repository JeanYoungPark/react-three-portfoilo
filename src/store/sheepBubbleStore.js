import { create } from "zustand";

/**
 * 말풍선 텍스트
 */
export const useBubbleStore = create((set) => ({
    text: "",
    setText: (value) => set(() => ({ text: value })),
}));
