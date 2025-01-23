import { create } from "zustand";

/**
 * 충돌 상태인 객체
 */
export const useCollisionObjStore = create((set) => ({
    ob: "",
    setOb: (ob) => set(() => ({ ob: ob })),
    clearOb: () => {
        set({ ob: "" });
    },
}));
