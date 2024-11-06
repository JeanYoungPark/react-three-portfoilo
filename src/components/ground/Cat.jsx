import { useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import React, { useRef } from "react";
import { useCharacterAnimation } from "../../hook/main/useCharacterAnimation";
import { useCharacterMovement } from "../../hook/main/useCharacterMovement";

export const Cat = () => {
    const rb = useRef();
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Cat.glb");
    const { actions, mixer } = useAnimations(animations, group);
    const { world } = useRapier();
    const [, get] = useKeyboardControls();
    const { anim, setAnim } = useCharacterAnimation(actions, mixer);
    const { checkGroundCollision, handleMovement } = useCharacterMovement(rb, world, group, setAnim);

    useFrame(() => {
        checkGroundCollision();
        handleMovement(get());
    });

    return (
        <RigidBody ref={rb} type='dynamic' colliders='cuboid' position={[18, 1, 4]} lockRotations mess={1}>
            <group ref={group}>
                <primitive object={nodes.AnimalArmature} />
                <skinnedMesh name='Ch14' geometry={nodes.Cat.geometry} material={materials.AtlasMaterial} skeleton={nodes.Cat.skeleton} />
            </group>
            <CapsuleCollider args={[0.25, 0.3]} position={[0, 0.5, 0]} />
        </RigidBody>
    );
};
