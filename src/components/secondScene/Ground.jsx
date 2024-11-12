import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React from "react";

const ground = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
];

export const Ground = () => {
    const dirt_block = useGLTF("./models/minecreft/Dirt Block.glb");
    const dead_tree = useGLTF("./models/minecreft/Dead Tree.glb");
    const dead_tree_2 = useGLTF("./models/minecreft/Dead Tree 2.glb");
    // const brick_block = useGLTF("./models/minecreft/Brick Block.glb");
    const wood_block = useGLTF("./models/minecreft/Wood Planks Block.glb");

    return (
        <group>
            <RigidBody type='fixed' colliders='trimesh'>
                {/* 땅 */}
                <group position={[0, 0, 0]}>
                    {ground.map((items, v) =>
                        items.map(
                            (item, h) =>
                                item && (
                                    <mesh
                                        key={v + h}
                                        geometry={dirt_block.nodes.Block_Dirt.geometry}
                                        position={[h * 2, 0, v * 2]}
                                        scale={[100, 100, 100]}
                                        material={dirt_block.materials.Atlas}
                                    />
                                )
                        )
                    )}
                </group>

                {/* 나무 */}
                <mesh
                    geometry={dead_tree.nodes.DeadTree_2.geometry}
                    position={[14, 1, 0]}
                    rotation={[0, -(Math.PI / 8), 0]}
                    scale={[100, 100, 100]}
                    material={dead_tree.materials.Atlas}
                />
                <mesh
                    geometry={dead_tree_2.nodes.DeadTree_1.geometry}
                    position={[14, 1, 5]}
                    rotation={[0, -(Math.PI / 8), 0]}
                    scale={[100, 100, 100]}
                    material={dead_tree.materials.Atlas}
                />
            </RigidBody>
        </group>
    );
};
