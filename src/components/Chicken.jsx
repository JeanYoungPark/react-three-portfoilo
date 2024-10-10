import { useAnimations, useGLTF } from "@react-three/drei";
import React from "react";

export const Chicken = () => {
    const chicken = useGLTF("./models/pack/Chicken.glb");
    const { actions } = useAnimations(chicken.animations, chicken.scene);

    console.log(chicken);
    return (
        <group position={[5, 0, 3]}>
            <primitive object={chicken.nodes.AnimalArmature} />
        </group>
    );
};
