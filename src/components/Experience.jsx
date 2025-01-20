import { useContext } from "react";
import { FirstScene } from "./FirstScene";
import { SecondScene } from "./SecondScene";
import { ThirdScene } from "./ThirdScene";
import { CubeManContext } from "../pages/Main";

export const Experience = ({ position }) => {
    const { cubeManRef } = useContext(CubeManContext);

    return (
        <group position={position}>
            <FirstScene />
            <SecondScene position={[-4, -20, 30]} />
            <ThirdScene position={[36, -40, 22]} rb={cubeManRef} />
        </group>
    );
};
