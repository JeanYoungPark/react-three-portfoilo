import { useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import React, { useRef } from "react";
import { useCharacterAnimation } from "../../hook/main/useCharacterAnimation";
import { useCharacterMovement } from "../../hook/main/useCharacterMovement";
import { useFrame } from "@react-three/fiber";

export const CubeMan = ({ position, setChestOpen }) => {
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Cube Guy Character.glb");
    // console.log(animations);
    const rb = useRef();
    const group = useRef();
    const collisionObj = useRef();
    const { actions, mixer } = useAnimations(animations, group);
    const { world } = useRapier();
    const [, get] = useKeyboardControls();

    const { setAnim } = useCharacterAnimation(actions, mixer);
    const { checkGroundCollision, handleMovement, handleCollisionEnter, handleCollisionExit } = useCharacterMovement(rb, world, group, setAnim);

    const collisionFn = (target) => {
        collisionObj.current = target.rigidBodyObject?.name;
    };

    useFrame(() => {
        checkGroundCollision();
        handleMovement(get());

        if (collisionObj.current === "chest") {
            get().space && setChestOpen((prev) => !prev);
        }

        if (rb.current) {
            const position = rb.current.translation();

            if (position.y < -10) {
                rb.current.setTranslation({ x: 18, y: 10, z: 4 });
            }
        }
    });

    return (
        <RigidBody
            ref={rb}
            type='dynamic'
            colliders={false}
            position={[18, 1, 6]}
            lockRotations
            mess={1}
            onCollisionEnter={(e) => handleCollisionEnter(e, collisionFn(e))}
            onIntersectionExit={handleCollisionExit}>
            <group ref={group}>
                <primitive object={nodes.CharacterArmature} />
                <skinnedMesh name='Ch14' geometry={nodes.Character.geometry} material={materials.Atlas} skeleton={nodes.Character.skeleton} />
            </group>
            <CapsuleCollider args={[0.2, 0.8]} position={[0, 1, 0]} />
        </RigidBody>
    );
};
