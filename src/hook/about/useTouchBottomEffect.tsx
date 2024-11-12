import React, { useEffect, useState } from "react";

export const useTouchBottomEffect = (): { skillClass: string } => {
    const [skillClass, setSkillClass] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            if (document.body.offsetHeight - window.scrollY - window.innerHeight === 0) {
                setSkillClass("active");
            } else {
                setSkillClass("");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return { skillClass };
};
