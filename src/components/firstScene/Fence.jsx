import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { forwardRef, useMemo } from "react";

const fenceData = [
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

export const Fence = forwardRef((props, fenceRef) => {
    const { nodes, materials } = useGLTF("./models/minecreft/Fence Center.glb");
    const { nodes: cornerNodes } = useGLTF("./models/minecreft/Fence Corner.glb");

    const fencePieces = useMemo(
        () =>
            fenceData.map((data, idx) => (
                <RigidBody type='fixed' colliders='cuboid' key={idx}>
                    <mesh
                        geometry={data.isCorner ? cornerNodes.Fence_Corner.geometry : nodes.Fence_Center.geometry}
                        position={data.position}
                        rotation={data.rotation}
                        scale={[100, 100, 100]}
                        material={materials.Atlas}
                    />
                </RigidBody>
            )),
        [nodes, cornerNodes, materials]
    );

    return (
        <group position={[2, 2, 5]} ref={fenceRef}>
            {fencePieces}
        </group>
    );
});
