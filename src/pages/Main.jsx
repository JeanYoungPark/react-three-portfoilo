import { Canvas, useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { KeyboardControls, OrbitControls, Scroll, ScrollControls } from "@react-three/drei";
import "../css/main.min.css";
import { Chicken } from "../components/Chicken";
import { Vector3 } from "three";
// import { Ground } from "../components/Ground";
// import { Rail } from "../components/Rail";
import { Chick } from "../components/Chick";
import { Fence } from "../components/Fence";
import { Cat } from "../components/Cat";
import { Particles } from "../components/Particles";
import { Experience } from "../components/Experience";
import { gsap } from "gsap";
import { CameraController } from "../components/CameraController";

const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "left", keys: ["ArrowLeft", "KeyA"] },
    { name: "right", keys: ["ArrowRight", "KeyD"] },
    { name: "run", keys: ["Shift"] },
    { name: "jump", keys: ["Space"] },
];

export const Main = () => {
    const initialPosition = [18, 60, 23]; // 초기 카메라 위치

    return (
        <KeyboardControls map={keyboardMap}>
            <Canvas shadows>
                <CameraController initialPosition={initialPosition} />
                <ambientLight intensity={1.5} />
                <directionalLight position={[-2, 4, 10]} intensity={2.5} />
                <OrbitControls />
                <Suspense />
                <Physics debug>
                    <Experience position={[0, 3, 0]} />
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
