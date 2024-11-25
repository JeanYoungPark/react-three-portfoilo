import { create } from "zustand";

export const useBubbleStore = create((set) => ({
    text: "",
    setText: (value) => set(() => ({ text: value })),
}));
