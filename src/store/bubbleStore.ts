import { ReactNode } from "react";
import { create } from "zustand";

interface BubbleState {
    text: ReactNode;
    isTalking: boolean;
    setIsTalking: (data: { text: ReactNode; isTalking: boolean }) => void;
}

/**
 * 말풍선 텍스트
 */
export const useBubbleStore = create<BubbleState>((set) => ({
    text: "",
    isTalking: false,
    setIsTalking: ({ text, isTalking }) => {
        set(() => ({ text, isTalking }));
    },
}));
