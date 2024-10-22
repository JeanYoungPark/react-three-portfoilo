import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import React, { Suspense, useRef } from "react";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import "../css/main.min.css";
import { Chicken } from "../components/Chicken";
import { Vector3 } from "three";
import { Ground } from "../components/Ground";
import { Chick } from "../components/Chick";
import { Fence } from "../components/Fence";
import { Rail } from "../components/Rail";
import { Cat } from "../components/Cat";

const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "left", keys: ["ArrowLeft", "KeyA"] },
    { name: "right", keys: ["ArrowRight", "KeyD"] },
    { name: "run", keys: ["Shift"] },
    { name: "jump", keys: ["Space"] },
];

export const Main = () => {
    const fenceRef = useRef();

    return (
        <KeyboardControls map={keyboardMap}>
            <Canvas camera={{ position: [22, 12, 25], fov: 75, far: 50 }} shadows>
                <ambientLight intensity={2} />
                <directionalLight position={[-2, 4, 10]} intensity={2} />
                <OrbitControls target={new Vector3(11, 0, 8)} minDistance={15} maxDistance={40} maxPolarAngle={Math.PI / 2} />
                <Suspense />
                <Physics>
                    <Ground />
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
                    <Cat />
                </Physics>
            </Canvas>
        </KeyboardControls>
    );
};
