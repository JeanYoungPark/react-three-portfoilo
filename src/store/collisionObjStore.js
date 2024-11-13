import { create } from "zustand";

export const useCollisionObjStore = create((set) => ({
    name: false,
    setName: (name) => set(() => ({ name: name })),
    clearName: () => set({ name: "" }),
}));
