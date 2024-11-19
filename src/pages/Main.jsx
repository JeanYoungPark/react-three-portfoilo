import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import React, { Suspense, useRef } from "react";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import "../css/main.min.css";
import { Particles } from "../components/Particles";
import { Experience } from "../components/Experience";
import { CameraController } from "../components/CameraController";
import { Rail } from "../components/common/Rail";
import { CubeMan } from "../components/secondScene/CubeMan";

const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "left", keys: ["ArrowLeft", "KeyA"] },
    { name: "right", keys: ["ArrowRight", "KeyD"] },
    { name: "run", keys: ["Shift"] },
    { name: "space", keys: ["Space"] },
];

export const Main = () => {
    return (
        <KeyboardControls map={keyboardMap}>
            <Canvas shadows>
                <CameraController />
                <ambientLight intensity={1.5} />
                <directionalLight position={[-2, 4, 10]} intensity={2.5} />
                {/* <OrbitControls /> */}
                <Suspense />
                <Physics debug>
                    <group position={[0, 3, 0]}>
                        <Rail />
                        <CubeMan />
                        <Experience />
                    </group>
                    {/* <Ground />
                    <group>
                        <Fence ref={fenceRef} />
                        <Chick fenceRef={fenceRef} />
                        <Chick fenceRef={fenceRef} />
                        <Chick fenceRef={fenceRef} />
                        <Chick fenceRef={fenceRef} />
                        <Chicken fenceRef={fenceRef} />
                        <Chicken fenceRef={fenceRef} />
                    </group>
                    <Rail />
                    <Cat /> */}
                </Physics>
                <Particles count={800} />
            </Canvas>
        </KeyboardControls>
    );
};
