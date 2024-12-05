import React, { useRef } from "react";
import { Ground } from "./secondScene/Ground";
import { House } from "./secondScene/House";
import { CubeMan } from "./common/CubeMan";
import { Dog } from "./secondScene/Dog";
import { Horse } from "./secondScene/Horse";
import { Pig } from "./secondScene/Pig";

export const SecondScene = ({ position }) => {
    return (
        <group position={position}>
            <Ground />
            <House position={[8, 2, 10]} rotation={[0, Math.PI / 2, 0]} />
            <Dog position={[13, 1, 12]} rotation={[0, (Math.PI / 3) * 2, 0]} />
            <Horse position={[24, 1, 2]} rotation={[0, -(Math.PI / 7), 0]} />
            <Pig position={[26, 1, 2]} rotation={[0, 0, 0]} />
        </group>
    );
};
