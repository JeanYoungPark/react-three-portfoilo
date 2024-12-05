import React from "react";
import { Ground } from "./thirdScene/Ground";
import { Igloo } from "./thirdScene/Igloo";
import { Yeti } from "./thirdScene/Yeti";
import { Wolf } from "./thirdScene/Wolf";

export const ThirdScene = ({ rb, position }) => {
    return (
        <group position={position}>
            <Ground />
            <Igloo position={[8, 2, 16]} />
            <Yeti position={[4, 1, 16]} rotation={[0, Math.PI / 6, 0]} rb={rb} />
            <Wolf position={[18, 1, 25]} rotation={[0, Math.PI / 4 + 60, 0]} />
        </group>
    );
};
