import { useAnimations, useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React, { useRef } from "react";
import { useAnimalAnimation } from "../../hook/main/useAnimalAnimation";

export const Pig = ({ position, rotation }) => {
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Pig.glb");

    const rb = useRef();
    const group = useRef();

    const { actions, mixer } = useAnimations(animations, group);
    const { setAnim } = useAnimalAnimation(actions, mixer);

    return (
        <RigidBody
            ref={rb}
            type='fixed'
            name='pig'
            colliders={false}
            position={position}
            rotation={rotation}
            lockRotations
            mess={1}
            // onCollisionEnter={(e) => handleCollisionEnter(e)}
            // onIntersectionExit={handleCollisionExit}
        >
            <group ref={group}>
                <primitive object={nodes.AnimalArmature} />
                <skinnedMesh geometry={nodes.Pig.geometry} material={materials.AtlasMaterial} skeleton={nodes.Pig.skeleton} />
            </group>
            <CuboidCollider args={[0.2, 0.8]} position={[0, 1, 0]} />
        </RigidBody>
    );
};
