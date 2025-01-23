import { ReactNode } from "react";
import { create } from "zustand";

/**
 * 말풍선 텍스트
 */
export const useBubbleStore = create((set) => ({
    text: "",
    isTalking: false,
    setIsTalking: ({ text, isTalking }: { text: ReactNode; isTalking: boolean }) => {
        set(() => ({ text, isTalking }));
    },
}));
