import { SpotLight, useAnimations, useGLTF } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef } from "react";

export const Chicken = () => {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Chicken.glb");
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        if (actions) {
            actions["AnimalArmature|AnimalArmature|AnimalArmature|Idle"]?.play();
            return () => actions["AnimalArmature|AnimalArmature|AnimalArmature|Idle"]?.fadeOut(0.24);
        }
    }, [actions]);

    useEffect(() => {
        if (group.current) {
            SpotLight.target = group.current;
        }
    }, [group]);

    return (
        <RigidBody colliders={false} lockRotations>
            {/* 그룹 */}
            <group position={[4.5, 2, 3]} ref={group} dispose={null}>
                <primitive object={nodes.AnimalArmature} />
                <skinnedMesh name='Chicken' geometry={nodes.Chicken.geometry} material={materials.AtlasMaterial} skeleton={nodes.Chicken.skeleton} />
            </group>

            {/* 캡슐 콜라이더 */}
            <CapsuleCollider args={[0.08, 0.15]} />
        </RigidBody>
    );
};

useGLTF.preload("./models/pack/Chicken.glb");
