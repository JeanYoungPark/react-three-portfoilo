import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import "../css/main.min.css";
import { Floor } from "../components/Floor";
import { Chicken } from "../components/Chicken";
import { Box3, Group, Vector3 } from "three";
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
];

export const Main = () => {
    const fenceRef = useRef();

    return (
        <KeyboardControls map={keyboardMap}>
            <Canvas camera={{ position: [25, 12, 22], fov: 75, far: 50 }} shadows>
                <ambientLight intensity={1.5} />
                <directionalLight position={[-2, 4, 10]} intensity={2} />
                <OrbitControls target={new Vector3(13, 0, 5)} minDistance={15} maxDistance={40} maxPolarAngle={Math.PI / 2} />
                <Suspense />
                <Physics debug>
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
                    {/* <Floor ref={floorRef} />
                <Chicken /> */}
                </Physics>
            </Canvas>
        </KeyboardControls>
    );
};
