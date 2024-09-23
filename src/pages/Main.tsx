import { Canvas } from "@react-three/fiber";
import React from "react";

export const Main = () => {
    return (
        <Canvas>
            <ambientLight />
            <directionalLight />
        </Canvas>
    );
};
