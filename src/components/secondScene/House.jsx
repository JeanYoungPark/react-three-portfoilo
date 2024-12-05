import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody, useRevoluteJoint } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import { useCollisionObjStore } from "../../store/collisionObjStore";
import { useDoorStore } from "../../store/doorStore";
import { useCartStore } from "../../store/cartStore";

const block = [
    [0, 0, 0],
    [2, 0, 0],
    [6, 0, 0],
    [8, 0, 0],
    [0, 2, 0],
    [2, 2, 0],
    [6, 2, 0],
    [8, 2, 0],
    [0, 4, 0],
    [2, 4, 0],
    [4, 4, 0],
    [6, 4, 0],
    [8, 4, 0],
    [0, 0, -2],
    [0, 0, -4],
    [0, 0, -6],
    [0, 2, -2],
    [0, 2, -4],
    [0, 2, -6],
    [0, 4, -2],
    [0, 4, -4],
    [0, 4, -6],
    [2, 0, -6],
    [4, 0, -6],
    [6, 0, -6],
    [8, 0, -6],
    [2, 2, -6],
    [4, 2, -6],
    [6, 2, -6],
    [8, 2, -6],
    [2, 4, -6],
    [4, 4, -6],
    [6, 4, -6],
    [8, 4, -6],
    [2, 4, -2],
    [4, 4, -2],
    [6, 4, -2],
    [8, 4, -2],
    [2, 4, -4],
    [4, 4, -4],
    [6, 4, -4],
    [8, 4, -4],
    [2, 4, -6],
    [4, 4, -6],
    [6, 4, -6],
    [8, 4, -6],
];

export const House = ({ position, rotation }) => {
    const door = useGLTF("./models/minecreft/Metal Door.glb");
    const wood_block = useGLTF("./models/minecreft/Wood Planks Block.glb");

    const { ob: collisionOb } = useCollisionObjStore();
    const { state: cartState } = useCartStore();
    const { door: isDoor, toggleDoor } = useDoorStore();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (collisionOb?.name === "door" && cartState === "done") {
                if (e.code === "Enter") {
                    toggleDoor();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [collisionOb]);

    return (
        <group position={position} rotation={rotation}>
            <RigidBody
                type='fixed'
                name='door'
                colliders={false}
                position={[4, -1, isDoor ? 2 : 0]}
                lockRotations
                rotation={[0, isDoor ? (Math.PI / 2) * 5 : 0, 0]}>
                <group>
                    <group>
                        <primitive object={door.nodes.Door_Closed} scale={[100, 100, 100]} />
                    </group>
                    <CuboidCollider args={[1, 2, 0.2]} position={[0, 2, 1]} />
                </group>
            </RigidBody>

            <group position={[0, 0, 0]}>
                {block.map((data, index) => {
                    return (
                        <RigidBody type='fixed' colliders='cuboid' key={index}>
                            <mesh
                                geometry={wood_block.nodes.Block_WoodPlanks.geometry}
                                position={data}
                                scale={[100, 100, 100]}
                                material={wood_block.materials.Atlas}
                            />
                        </RigidBody>
                    );
                })}
            </group>
        </group>
    );
};
