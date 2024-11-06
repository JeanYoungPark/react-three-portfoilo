import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import { useAnimFrame } from "../../hook/main/useAnimFrame";

export const Chick = ({ fenceRef, position }) => {
    const group = useRef();
    const { clone } = useAnimFrame({ url: "/models/minecreft/Chick.glb", fenceRef, group });

    return (
        <group ref={group} dispose={null} position={position}>
            <primitive object={clone} scale={[0.7, 0.7, 0.7]} />
        </group>
    );
};

useGLTF.preload("./models/minecreft/Chick.glb");
