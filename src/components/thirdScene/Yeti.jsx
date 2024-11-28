import { Html, useAnimations, useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React, { useRef } from "react";
import { useCollisionObjStore } from "../../store/collisionObjStore";
import { useSpaceStore } from "../../store/spaceStore";
import { useEnemyAnimation } from "../../hook/main/useEnemyAnimation";

export const Yeti = ({ position, rotation }) => {
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Yeti.glb");
    const { ob: collisionOb } = useCollisionObjStore();
    const { space } = useSpaceStore();

    const rb = useRef();
    const group = useRef();

    const { actions, mixer } = useAnimations(animations, group);
    const { setAnim } = useEnemyAnimation(actions, mixer);

    return (
        <group position={position} rotation={rotation}>
            <group position={[0, 4, 0]}>
                <Html center>
                    <div className={`bubble ${space && collisionOb?.name === "yeti" && "off"}`}>
                        <b>...</b>
                    </div>
                </Html>
            </group>

            <RigidBody ref={rb} type='fixed' name='yeti' lockRotations>
                <group ref={group}>
                    <primitive object={nodes.EnemyArmature} />
                    <skinnedMesh geometry={nodes.Yeti.geometry} material={materials.Atlas} skeleton={nodes.Yeti.skeleton} />
                </group>
                <CuboidCollider args={[1.5, 1.6, 1]} position={[0, 1.6, 0.5]} />
            </RigidBody>
        </group>
    );
};
