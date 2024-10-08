import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import React from "react";
import { OrbitControls } from "@react-three/drei";
import "../css/main.min.css";
import { Forest } from "../components/Forest";
import { CharacterContainer } from "../components/CharacterContainer";
import { Floor } from "../components/Floor";

export const Main = () => {
    return (
        <Canvas camera={{ position: [5, 5, 15], fov: 75 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <OrbitControls />
            <Physics>
                <Floor />
                {/* <Forest />
                <CharacterContainer /> */}
            </Physics>
        </Canvas>
    );
    // return (
    //     <Canvas shadows camera={{ position: [140, 60, 0], near: 0.1, fov: 40 }}>
    //         <ambientLight intensity={5} castShadow />
    //         <directionalLight intensity={1} castShadow />
    //         <OrbitControls />
    //         <Physics>
    //             <Floor />
    //             {/* <Forest />
    //             <CharacterContainer /> */}
    //         </Physics>
    //     </Canvas>
    // );
};
