import React from "react";
import { Ground } from "./thirdScene/Ground";
import { Igloo } from "./thirdScene/Igloo";
import { Yeti } from "./thirdScene/Yeti";
import { Wolf } from "./thirdScene/Wolf";

export const ThirdScene = ({ position }) => {
    return (
        <group position={position}>
            <Ground />
            <Igloo position={[8, 2, 18]} />
            <Yeti position={[4, 2, 16]} rotation={[0, Math.PI / 6, 0]} />
            <Wolf position={[18, 2, 26]} rotation={[0, -(Math.PI / 2), 0]} />
        </group>
    );
};
