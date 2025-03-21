import { useGLTF } from "@react-three/drei";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import { useContext, useEffect, useRef } from "react";
import { useCharacterMovement } from "../../hook/main/useCharacterMovement";
import { useFrame } from "@react-three/fiber";
import { CubeManContext } from "../../pages/Main";

export const CubeMan = () => {
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Cube Guy Character.glb");
    const { cubeManRef } = useContext(CubeManContext);

    const group = useRef();
    const { world } = useRapier();
    const { checkGroundCollision, handleMovement, handleCollisionEnter, handleCollisionExit, handleKeyDown, handleKeyUp } = useCharacterMovement(
        cubeManRef,
        world,
        group,
        animations
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    useFrame(() => {
        checkGroundCollision();
        handleMovement();
    });

    return (
        <RigidBody
            ref={cubeManRef}
            type='dynamic'
            colliders={false}
            position={[18, 1, 6]}
            lockRotations
            mess={1}
            onCollisionEnter={(e) => handleCollisionEnter(e)}
            onIntersectionExit={(e) => handleCollisionExit(e)}>
            <group ref={group}>
                <primitive object={nodes.CharacterArmature} />
                <skinnedMesh name='Ch14' geometry={nodes.Character.geometry} material={materials.Atlas} skeleton={nodes.Character.skeleton} />
            </group>
            <CapsuleCollider args={[0.2, 0.8]} position={[0, 1, 0]} />
        </RigidBody>
    );
};
