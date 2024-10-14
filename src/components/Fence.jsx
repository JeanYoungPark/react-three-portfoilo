import { useGLTF } from "@react-three/drei";
import React from "react";

const fence = [
    { position: [0, 0, 0], rotation: [0, Math.PI / 2, 0], isCorner: true },
    { position: [2, 0, 0], rotation: [0, 0, 0], isCorner: false },
    { position: [4, 0, 0], rotation: [0, 0, 0], isCorner: false },
    { position: [6, 0, 0], rotation: [0, 0, 0], isCorner: false },
    { position: [8, 0, 0], rotation: [0, 0, 0], isCorner: false },
    { position: [10, 0, 0], rotation: [0, 0, 0], isCorner: true },
    { position: [0, 0, 2], rotation: [0, Math.PI / 2, 0], isCorner: false },
    { position: [10, 0, 2], rotation: [0, Math.PI / 2, 0], isCorner: false },
    { position: [0, 0, 4], rotation: [0, Math.PI / 2, 0], isCorner: false },
    { position: [10, 0, 4], rotation: [0, Math.PI / 2, 0], isCorner: false },
    { position: [0, 0, 6], rotation: [0, Math.PI / 2, 0], isCorner: false },
    { position: [10, 0, 6], rotation: [0, Math.PI / 2, 0], isCorner: false },
    { position: [0, 0, 8], rotation: [0, Math.PI, 0], isCorner: true },
    { position: [2, 0, 8], rotation: [0, 0, 0], isCorner: false },
    { position: [4, 0, 8], rotation: [0, 0, 0], isCorner: false },
    { position: [6, 0, 8], rotation: [0, 0, 0], isCorner: false },
    { position: [8, 0, 8], rotation: [0, 0, 0], isCorner: false },
    { position: [10, 0, 8], rotation: [0, -(Math.PI / 2), 0], isCorner: true },
];

export const Fence = () => {
    const fence_center = useGLTF("./models/minecreft/Fence Center.glb");
    const fence_corner = useGLTF("./models/minecreft/Fence Corner.glb");

    return (
        <>
            {/* 울타리 */}
            <group position={[2, 2, 5]}>
                {fence.map((data, idx) => (
                    <mesh
                        geometry={data.isCorner ? fence_corner.nodes.Fence_Corner.geometry : fence_center.nodes.Fence_Center.geometry}
                        position={data.position}
                        rotation={data.rotation}
                        scale={[100, 100, 100]}
                        material={fence_corner.materials.Atlas}
                    />
                ))}
            </group>
        </>
    );
};
