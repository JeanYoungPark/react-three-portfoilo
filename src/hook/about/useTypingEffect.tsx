import React, { useEffect, useState } from "react";

export const useTypingEffect = ({ texts, delay = 4000 }: { texts: string[]; delay: number }): { currentText: string } => {
    const [currentText, setCurrentText] = useState(texts[0]);

    useEffect(() => {
        let currentIndex = 0;
        const changeText = () => {
            setCurrentText(texts[currentIndex]);
            currentIndex = (currentIndex + 1) % texts.length;
        };

        const intervalId = setInterval(changeText, delay);
        return () => clearInterval(intervalId);
    }, [texts, delay]);

    return { currentText };
};
