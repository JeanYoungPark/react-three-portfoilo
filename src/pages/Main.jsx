import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import React, { Suspense } from "react";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import "../css/main.min.css";
import { Particles } from "../components/Particles";
import { Experience } from "../components/Experience";
import { CameraController } from "../components/CameraController";
import { Rail } from "../components/common/Rail";

const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "left", keys: ["ArrowLeft", "KeyA"] },
    { name: "right", keys: ["ArrowRight", "KeyD"] },
    { name: "run", keys: ["Shift"] },
    { name: "jump", keys: ["Space"] },
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
                <Physics>
                    <group position={[0, 3, 0]}>
                        <Rail />
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
                <Particles count={500} />
            </Canvas>
        </KeyboardControls>
    );
};
