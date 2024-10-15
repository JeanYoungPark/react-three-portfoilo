import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import "../css/main.min.css";
import { Floor } from "../components/Floor";
import { Chicken } from "../components/Chicken";
import { Box3, Group, Vector3 } from "three";
import { Ground } from "../components/Ground";
import { Chickens } from "../components/Chickens";
import { Fence } from "../components/Fence";
import { Rail } from "../components/Rail";

export const Main = () => {
    const fenceRef = useRef();

    return (
        <Canvas camera={{ position: [12, 6, 20], fov: 75 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[-2, 4, 10]} intensity={2} />
            <OrbitControls target={new Vector3(6, 0, 4)} />
            <Suspense />
            <Physics debug>
                <group>
                    <RigidBody type='fixed' colliders='trimesh'>
                        <Ground />
                    </RigidBody>
                </group>
                <group>
                    <Fence ref={fenceRef} />
                    <Chickens fenceRef={fenceRef} />
                    <Chickens fenceRef={fenceRef} />
                    <Chickens fenceRef={fenceRef} />
                </group>
                <Rail />
                {/* <Floor ref={floorRef} />
                <Chicken /> */}
            </Physics>
        </Canvas>
    );
};
