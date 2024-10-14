import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import "../css/main.min.css";
import { Floor } from "../components/Floor";
import { Chicken } from "../components/Chicken";
import { Group, Vector3 } from "three";
import { Ground } from "../components/Ground";
import { Chickens } from "../components/Chickens";

export const Main = () => {
    return (
        <Canvas camera={{ position: [12, 6, 20], fov: 75 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[-2, 4, 10]} intensity={2} />
            <OrbitControls target={new Vector3(6, 0, 4)} />
            <Physics>
                <Ground />
                <Chickens />
                {/* <Floor ref={floorRef} />
                <Chicken /> */}
            </Physics>
        </Canvas>
    );
};
