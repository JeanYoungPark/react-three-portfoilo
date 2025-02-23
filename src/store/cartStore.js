import { create } from "zustand";

/**
 * 마인 카드의 상태
 */
export const useCartStore = create((set) => ({
    state: "done",
    setState: (value) => set(() => ({ state: value })),
}));
