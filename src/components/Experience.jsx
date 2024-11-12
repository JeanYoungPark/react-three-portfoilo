import React from "react";
import { FirstScene } from "./FirstScene";
import { SecondScene } from "./SecondScene";
import { ThirdScene } from "./ThirdScene";
import { Cat } from "./firstScene/Cat";
import { CubeMan } from "./secondScene/CubeMan";
import { useChestAction } from "../hook/main/useChestAction";

export const Experience = ({ position }) => {
    const { chestOpen, setChestOpen } = useChestAction();

    return (
        <group position={position}>
            <FirstScene chestOpen={chestOpen} />
            <SecondScene position={[-4, -20, 30]} />
            <ThirdScene position={[36, -40, 22]} />
            <CubeMan setChestOpen={setChestOpen} />
        </group>
    );
};
