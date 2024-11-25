import { create } from "zustand";

export const useCollisionObjStore = create((set) => ({
    ob: false,
    setOb: (ob) => set(() => ({ ob: ob })),
    clearOb: () => set({ ob: "" }),
}));
