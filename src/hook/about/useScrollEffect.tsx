import React, { useEffect, useState } from "react";

export const useScrollEffect = ({
    containerRef,
    descriptionText,
}: {
    containerRef: React.RefObject<HTMLElement>;
    descriptionText: string;
}): { visibleIndexes: number[]; descClass: string } => {
    const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
    const [descClass, setDescClass] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const scrollY = window.scrollY;
                const windowHeight = window.innerHeight;
                const aboutOffsetHeight = containerRef.current.offsetHeight;
                const aboutOffsetTop = containerRef.current.offsetTop;

                const eachPercentage = Math.floor((aboutOffsetHeight - windowHeight) / descriptionText.length);
                const currentPercentage = scrollY - aboutOffsetTop;

                if (scrollY >= aboutOffsetTop) {
                    setDescClass("active");

                    const newVisibleIndexes =
                        currentPercentage / eachPercentage < 2 ? 0 : Math.min(Math.floor(currentPercentage / eachPercentage), descriptionText.length);

                    setVisibleIndexes((prevIndexes) => {
                        const updatedIndexes = new Array(newVisibleIndexes).fill(0).map((_, i) => i);
                        return updatedIndexes;
                    });
                } else {
                    setDescClass("");
                    setVisibleIndexes([]);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [containerRef, descriptionText.length]);

    return { visibleIndexes, descClass };
};
