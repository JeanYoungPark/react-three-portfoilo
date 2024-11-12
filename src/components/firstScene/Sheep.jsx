import { Html, useAnimations, useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import { useAnimalAnimation } from "../../hook/main/useAnimalAnimation";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

export const Sheep = ({ position, rotation }) => {
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Sheep.glb");

    const rb = useRef();
    const group = useRef();
    const { actions, mixer } = useAnimations(animations, group);
    const { setAnim } = useAnimalAnimation(actions, mixer);

    return (
        <group position={position} rotation={rotation}>
            <group position={[0, 2.5, 0]}>
                <Html center>
                    <div className='bubble'>
                        <p>Hello</p>
                    </div>
                </Html>
            </group>

            <RigidBody ref={rb} type='fixed' name='sheep' lockRotations mess={1} onCollisionEnter={false}>
                <group ref={group}>
                    <primitive object={nodes.AnimalArmature} />
                    <skinnedMesh geometry={nodes.Sheep.geometry} material={materials.AtlasMaterial} skeleton={nodes.Sheep.skeleton} />
                </group>
                <CapsuleCollider args={[0.1, 0.5]} position={[0, 0.6, 0.5]} />
                <CapsuleCollider args={[0.1, 0.5]} position={[0, 0.6, -0.5]} />
            </RigidBody>
        </group>
    );
};
