import { create } from "zustand";

export const useSheepBubbleStore = create((set) => ({
    text: "...",
    setText: (value) => set(() => ({ text: value })),
}));
