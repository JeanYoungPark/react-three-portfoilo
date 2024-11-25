import { Html, useAnimations, useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React, { useRef } from "react";
import { useAnimalAnimation } from "../../hook/main/useAnimalAnimation";
import { useCollisionObjStore } from "../../store/collisionObjStore";
import { useSpaceStore } from "../../store/spaceStore";

export const Pig = ({ position, rotation }) => {
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Pig.glb");
    const { ob: collisionOb } = useCollisionObjStore();
    const { space } = useSpaceStore();

    const rb = useRef();
    const group = useRef();

    const { actions, mixer } = useAnimations(animations, group);
    const { setAnim } = useAnimalAnimation(actions, mixer);

    return (
        <group position={position} rotation={rotation}>
            <group position={[0, 3, 0]}>
                <Html center>
                    <div className={`bubble ${space && collisionOb?.name === "pig" && "off"}`}>
                        <b>...</b>
                    </div>
                </Html>
            </group>

            <RigidBody ref={rb} type='fixed' name='pig' lockRotations>
                <group ref={group}>
                    <primitive object={nodes.AnimalArmature} />
                    <skinnedMesh geometry={nodes.Pig.geometry} material={materials.AtlasMaterial} skeleton={nodes.Pig.skeleton} />
                </group>
                <CuboidCollider args={[0.7, 0.8, 1.3]} position={[0, 0.6, 0]} />
            </RigidBody>
        </group>
    );
};
