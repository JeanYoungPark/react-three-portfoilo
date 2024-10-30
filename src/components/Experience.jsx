import React from "react";
import { FirstScene } from "./FirstScene";
import { SecondScene } from "./SecondScene";

export const Experience = ({ position }) => {
    return (
        <group position={position}>
            <FirstScene />
            <SecondScene position={[0, -50, 0]} />
        </group>
    );
};
