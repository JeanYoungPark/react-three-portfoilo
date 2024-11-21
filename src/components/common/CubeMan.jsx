import { useAnimations, useGLTF } from "@react-three/drei";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import React, { useRef } from "react";
import { useCharacterAnimation } from "../../hook/main/useCharacterAnimation";
import { useCharacterMovement } from "../../hook/main/useCharacterMovement";
import { useFrame } from "@react-three/fiber";

export const CubeMan = ({ rb }) => {
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Cube Guy Character.glb");

    const group = useRef();
    const { actions, mixer } = useAnimations(animations, group);
    const { world } = useRapier();

    const { setAnim } = useCharacterAnimation(actions, mixer);
    const { checkGroundCollision, handleMovement, handleCollisionEnter, handleCollisionExit, handleCollisions } = useCharacterMovement(
        rb,
        world,
        group,
        setAnim
    );

    useFrame(() => {
        checkGroundCollision();
        handleMovement();
        handleCollisions();

        // if (rb.current) {
        //     const position = rb.current.translation();

        //     if (position.y < -10) {
        //         rb.current.setTranslation({ x: 18, y: 10, z: 4 });
        //     }
        // }
    });

    return (
        <RigidBody
            ref={rb}
            type='dynamic'
            colliders={false}
            position={[18, 1, 6]}
            lockRotations
            mess={1}
            onCollisionEnter={(e) => handleCollisionEnter(e)}
            onIntersectionExit={handleCollisionExit}>
            <group ref={group}>
                <primitive object={nodes.CharacterArmature} />
                <skinnedMesh name='Ch14' geometry={nodes.Character.geometry} material={materials.Atlas} skeleton={nodes.Character.skeleton} />
            </group>
            <CapsuleCollider args={[0.2, 0.8]} position={[0, 1, 0]} />
        </RigidBody>
    );
};
