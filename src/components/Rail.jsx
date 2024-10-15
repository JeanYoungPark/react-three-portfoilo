import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";

const rail = [
    { position: [0, 0, 0], rotation: [0, 0, 0], isCorner: false, isIncline: false },
    { position: [2, 0, 0], rotation: [0, 0, 0], isCorner: false, isIncline: false },
    { position: [4, 0, 0], rotation: [0, 0, 0], isCorner: false, isIncline: false },
    { position: [6, 0, 0], rotation: [0, 0, 0], isCorner: false, isIncline: false },
    { position: [8, 0, 0], rotation: [0, 0, 0], isCorner: false, isIncline: false },
    { position: [11, -1, 0], rotation: [0, 0, Math.PI / 2], isCorner: false, isIncline: true },
    { position: [12, -2, 0], rotation: [0, -(Math.PI / 2), 0], isCorner: true, isIncline: false },
    { position: [12, -2, 2], rotation: [0, Math.PI / 2, 0], isCorner: false, isIncline: false },
    { position: [12, -2, 4], rotation: [0, Math.PI / 2, 0], isCorner: false, isIncline: false },
    { position: [12, -2, 6], rotation: [0, Math.PI / 2, 0], isCorner: false, isIncline: false },
    { position: [12, -2, 8], rotation: [0, Math.PI / 2, 0], isCorner: true, isIncline: false },
    { position: [14, -2, 8], rotation: [0, 0, 0], isCorner: false, isIncline: false },
    { position: [16, -2, 8], rotation: [0, 0, 0], isCorner: false, isIncline: false },
    { position: [18, -2, 8], rotation: [0, 0, 0], isCorner: false, isIncline: false },
];

export const Rail = () => {
    const grass_block = useGLTF("./models/minecreft/Grass Block.glb");
    const cartRef = useRef();
    const currentRailIndex = useRef(0);
    const speed = 0.02;

    const { nodes: rail_corner } = useGLTF("./models/minecreft/Rail Corner.glb");
    const { nodes: rail_incline } = useGLTF("./models/minecreft/Rail Incline.glb");
    const { nodes: rail_straight } = useGLTF("./models/minecreft/Rail Straight.glb");
    const minecart = useGLTF("./models/minecreft/minecart.glb");
    const wood_chest = useGLTF("./models/minecreft/Wood Chest.glb");

    useEffect(() => {
        // 초기 위치 설정 (레일의 시작 위치)
        cartRef.current.position.set(0, 0.1, 0); // 예시 초기 위치
    }, []);

    useFrame(() => {
        if (cartRef.current && rail.length > 0 && currentRailIndex.current < rail.length) {
            const currentPosition = cartRef.current.position.clone();
            const targetPosition = new Vector3(...rail[currentRailIndex.current].position);

            // 목표 위치에 도달했는지 확인
            const distance = currentPosition.distanceTo(targetPosition);
            if (distance < 0.1) {
                // 다음 레일 섹션으로 이동
                currentRailIndex.current = (currentRailIndex.current + 1) % rail.length;
            } else {
                // 목표 위치로 슬라이드
                const direction = targetPosition.clone().sub(currentPosition).normalize();
                cartRef.current.position.add(direction.multiplyScalar(speed));
            }
        }
    });

    return (
        <group position={[2, 3, 2]}>
            <RigidBody type='dynamic'>
                <group ref={cartRef}>
                    <primitive object={minecart.nodes.Cart} />
                </group>
                <CapsuleCollider args={[0.08, 0.15]} />
            </RigidBody>
            <RigidBody type='fixed' colliders='trimesh'>
                {rail.map((data, index) => {
                    // 메쉬 복사본을 생성
                    const mesh = data.isCorner
                        ? rail_corner.Rail_Corner.clone()
                        : data.isIncline
                        ? rail_incline.Rail_Incline.clone()
                        : rail_straight.Rail_Straight.clone();

                    return (
                        <group key={index} position={data.position} rotation={data.rotation}>
                            <primitive object={mesh} />
                        </group>
                    );
                })}

                <group position={[20, -2, 8]} rotation={[0, -(Math.PI / 2), 0]}>
                    <primitive object={wood_chest.nodes.Chest_Closed} />
                </group>

                <group>
                    <mesh
                        geometry={grass_block.nodes.Block_Grass.geometry}
                        position={[0, -1, 0]}
                        scale={[100, 100, 100]}
                        material={grass_block.materials.Atlas}
                    />
                    <mesh
                        geometry={grass_block.nodes.Block_Grass.geometry}
                        position={[2, -1, 0]}
                        scale={[100, 100, 100]}
                        material={grass_block.materials.Atlas}
                    />
                    <mesh
                        geometry={grass_block.nodes.Block_Grass.geometry}
                        position={[4, -1, 0]}
                        scale={[100, 100, 100]}
                        material={grass_block.materials.Atlas}
                    />
                    <mesh
                        geometry={grass_block.nodes.Block_Grass.geometry}
                        position={[6, -1, 0]}
                        scale={[100, 100, 100]}
                        material={grass_block.materials.Atlas}
                    />
                    <mesh
                        geometry={grass_block.nodes.Block_Grass.geometry}
                        position={[8, -1, 0]}
                        scale={[100, 100, 100]}
                        material={grass_block.materials.Atlas}
                    />
                </group>
            </RigidBody>
        </group>
    );
};
