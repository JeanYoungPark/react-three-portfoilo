import { useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import React, { useRef } from "react";
import { useCharacterAnimation } from "../../hook/main/useCharacterAnimation";
import { useCharacterMovement } from "../../hook/main/useCharacterMovement";

export const Cat = ({ setChestOpen }) => {
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Cat.glb");

    const rb = useRef();
    const group = useRef();
    const { actions, mixer } = useAnimations(animations, group);
    const { world } = useRapier();
    const [, get] = useKeyboardControls();

    const { setAnim } = useCharacterAnimation(actions, mixer);
    const { checkGroundCollision, handleMovement } = useCharacterMovement(rb, world, group, setAnim);

    const handleCollisionEnter = (target) => {
        if (target.rigidBodyObject?.name === "chest") {
            setChestOpen(true);
        }
    };

    useFrame(() => {
        checkGroundCollision();
        handleMovement(get());

        const position = rb.current.translation();

        if (position.y < -10) {
            rb.current.setTranslation({ x: 18, y: 10, z: 4 });
        }
    });

    return (
        <RigidBody ref={rb} type='dynamic' colliders={false} position={[18, 1, 4]} lockRotations mess={1} onCollisionEnter={handleCollisionEnter}>
            <group ref={group}>
                <primitive object={nodes.AnimalArmature} />
                <skinnedMesh name='Ch14' geometry={nodes.Cat.geometry} material={materials.AtlasMaterial} skeleton={nodes.Cat.skeleton} />
            </group>
            <CapsuleCollider args={[0.1, 0.5]} position={[-0.3, 0.5, 0.5]} />
            <CapsuleCollider args={[0.1, 0.5]} position={[-0.3, 0.5, -0.5]} />
            <CapsuleCollider args={[0.1, 0.5]} position={[0.3, 0.5, 0.5]} />
            <CapsuleCollider args={[0.1, 0.5]} position={[0.3, 0.5, -0.5]} />
        </RigidBody>
    );
};
