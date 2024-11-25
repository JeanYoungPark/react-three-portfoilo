import { create } from "zustand";

export const useCartStore = create((set) => ({
    state: "done",
    setState: (value) => set(() => ({ state: value })),
}));
