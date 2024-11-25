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

function generateIglooBlocks() {
    const blocks = [];

    for (let x = 0; x <= 12; x += 2) {
        for (let z = -4; z >= -8; z -= 2) {
            if (x === 0 || x === 12) {
                blocks.push([x, 0, z]);
                blocks.push([x, 2, z]);
                blocks.push([x, 4, z]);
            } else if (x === 2 || x === 10) {
                blocks.push([x, 6, z]);
            } else {
                blocks.push([x, 8, z]);
            }
        }
    }

    for (let x = 2; x <= 10; x += 2) {
        for (let y = 0; y <= 6; y += 2) {
            if (x === 2 || x === 10) {
                blocks.push([x, y, -2]);
                blocks.push([x, y, -10]);
            } else {
                if (y === 6) {
                    blocks.push([x, y, -2]);
                    blocks.push([x, y, -10]);
                } else {
                    blocks.push([x, y, -10]);
                }
            }
        }
    }

    return blocks;
}

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
                {generateIglooBlocks().map((data, index) => {
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
