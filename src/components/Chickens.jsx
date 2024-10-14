import { useAnimations, useGLTF } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef } from "react";

export const Chickens = () => {
    const group = useRef();
    const chick = useGLTF("./models/minecreft/Chick.glb");
    const { actions } = useAnimations(chick.animations, group);

    useEffect(() => {
        if (actions) {
            actions["AnimalArmature|AnimalArmature|AnimalArmature|Idle"]?.play();
            return () => actions["AnimalArmature|AnimalArmature|AnimalArmature|Idle"]?.fadeOut(0.24);
        }
    }, [actions]);

    return (
        <RigidBody colliders={false} lockRotations>
            {/* 그룹 */}
            <group position={[4, 2, 7]} ref={group} dispose={null}>
                <primitive object={chick.nodes.AnimalArmature} />
                <skinnedMesh
                    name='chick1'
                    geometry={chick.nodes.Chicken.geometry}
                    material={chick.materials.AtlasMaterial}
                    skeleton={chick.nodes.Chicken.skeleton}
                />
            </group>

            {/* 캡슐 콜라이더 */}
            <CapsuleCollider args={[0.08, 0.15]} />
        </RigidBody>
    );
};
