import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React from "react";

const entrance = [
    [4, 0, 0],
    [4, 2, 0],
    [4, 4, 0], // 왼쪽 세로벽
    [6, 4, 0], // 상단과 하단 연결부
    [8, 0, 0],
    [8, 2, 0],
    [8, 4, 0], // 오른쪽 세로벽
];

const block = [
    [0, 0, -6],
    [0, 0, -8],
    [0, 0, -10],
    [0, 2, -6],
    [0, 2, -8],
    [0, 2, -10],
    [0, 4, -6],
    [0, 4, -8],
    [0, 4, -10],

    [2, 0, -4],
    [2, 0, -12],
    [2, 2, -4],
    [2, 2, -12],
    [2, 4, -4],
    [2, 4, -12],
    [2, 6, -4],
    [2, 6, -6],
    [2, 6, -8],
    [2, 6, -10],
    [2, 6, -12],

    [4, 0, -2],
    [4, 0, -12],
    [4, 2, -2],
    [4, 2, -12],
    [4, 4, -2],
    [4, 4, -12],
    [4, 6, -4],
    [4, 6, -12],
    [4, 8, -6],
    [4, 8, -8],
    [4, 8, -10],

    [6, 0, -12],
    [6, 2, -12],
    [6, 4, -2],
    [6, 4, -12],
    [6, 6, -4],
    [6, 6, -12],
    [6, 8, -6],
    [6, 8, -8],
    [6, 8, -10],

    [8, 0, 0],
    [8, 0, -2],
    [8, 0, -12],
    [8, 2, -2],
    [8, 2, -12],
    [8, 4, -2],
    [8, 4, -12],
    [8, 6, -4],
    [8, 6, -12],
    [8, 8, -6],
    [8, 8, -8],
    [8, 8, -10],

    [10, 0, -4],
    [10, 0, -10],
    [10, 0, -12],
    [10, 2, -4],
    [10, 2, -10],
    [10, 2, -12],
    [10, 4, -4],
    [10, 4, -6],
    [10, 4, -10],
    [10, 4, -12],
    [10, 6, -4],
    [10, 6, -6],
    [10, 6, -8],
    [10, 6, -10],
    [10, 6, -12],

    [12, 0, -6],
    [12, 0, -8],
    [12, 0, -10],
    [12, 2, -6],
    [12, 2, -8],
    [12, 2, -10],
    [12, 4, -6],
    [12, 4, -8],
    [12, 4, -10],
];

export const Igloo = ({ position }) => {
    const ice_block = useGLTF("./models/minecreft/Ice Block.glb");

    return (
        <group position={position}>
            <group position={[0, 0, 0]}>
                {entrance.map((data, index) => {
                    return (
                        <mesh
                            key={index}
                            geometry={ice_block.nodes.Block_Ice.geometry}
                            position={data}
                            scale={[100, 100, 100]}
                            material={ice_block.materials.Atlas}
                        />
                    );
                })}
                {block.map((data, index) => {
                    return (
                        <mesh
                            key={index}
                            geometry={ice_block.nodes.Block_Ice.geometry}
                            position={data}
                            scale={[100, 100, 100]}
                            material={ice_block.materials.Atlas}
                        />
                    );
                })}
            </group>
        </group>
    );
};
