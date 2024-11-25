import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { useRef } from "react";

import { useAnimFrame } from "../../hook/main/useAnimFrame";

export const Chicken = ({ fenceRef, position }) => {
    const group = useRef();
    const { clone } = useAnimFrame({ url: "/models/minecreft/Chicken.glb", fenceRef, group });

    return (
        <group ref={group} dispose={null} position={position}>
            <primitive object={clone} scale={[1.2, 1.2, 1.2]} />
        </group>
    );
};

useGLTF.preload("./models/pack/Chicken.glb");
