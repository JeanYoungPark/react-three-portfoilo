import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import { MathUtils, Vector3 } from "three";

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

let cartTimeout = null;

export const Rail = () => {
    const grass_block = useGLTF("./models/minecreft/Grass Block.glb");
    const cartRef = useRef();
    const currentRailIndex = useRef(0);
    const [chestOpen, setChestOpen] = useState(false);
    const [start, setStart] = useState(false);
    let speed = 0.05;

    const { nodes: rail_corner } = useGLTF("./models/minecreft/Rail Corner.glb");
    const { nodes: rail_incline } = useGLTF("./models/minecreft/Rail Incline.glb");
    const { nodes: rail_straight } = useGLTF("./models/minecreft/Rail Straight.glb");
    const minecart = useGLTF("./models/minecreft/minecart.glb");
    const wood_chest_close = useGLTF("./models/minecreft/Wood Chest.glb");
    const wood_chest_open = useGLTF("./models/minecreft/Chest Open.glb");

    useEffect(() => {
        return () => {
            cartTimeout && clearTimeout(cartTimeout);
        };
    }, []);

    useFrame(() => {
        if (cartRef.current && rail.length > 0) {
            if (start) {
                if (currentRailIndex.current < rail.length) {
                    const currentPosition = cartRef.current.position.clone();

                    const targetPosition = new Vector3(...rail[currentRailIndex.current].position);
                    const targetPositionXZ = targetPosition.clone().setY(targetPosition.y + 0.2);

                    const targetRotation = new Vector3(...rail[currentRailIndex.current].rotation);

                    // 목표 위치에 도달했는지 확인
                    const distance = currentPosition.distanceTo(targetPositionXZ);

                    if (distance < 0.1) {
                        // 다음 레일 섹션으로 이동
                        currentRailIndex.current = currentRailIndex.current + 1;
                    } else {
                        // 내리막길
                        if (rail[currentRailIndex.current].isIncline) {
                            speed = 0.08;

                            if (targetPositionXZ.x / 2 < cartRef.current.position.x) {
                                cartRef.current.rotation.z = MathUtils.lerp(cartRef.current.rotation.z, -(Math.PI / 4), 0.1);
                            }

                            if ((targetPositionXZ.x / 4) * 3 > cartRef.current.position.x) {
                                cartRef.current.rotation.z = MathUtils.lerp(cartRef.current.rotation.z, 0, 0.1);
                            }
                        } else {
                            if (rail[currentRailIndex.current].isCorner) {
                                speed = 0.07;
                                cartRef.current.rotation.z = MathUtils.lerp(cartRef.current.rotation.z, 0, 0.1);
                                if (targetRotation.y * (180 / Math.PI) === -90) {
                                    cartRef.current.rotation.y = MathUtils.lerp(cartRef.current.rotation.y, -(Math.PI / 2), 0.1);
                                } else if (targetRotation.y * (180 / Math.PI) === 90) {
                                    cartRef.current.rotation.y = MathUtils.lerp(cartRef.current.rotation.y, 0, 0.1);
                                }
                            }
                        }

                        // 목표 위치로 슬라이드
                        const direction = targetPositionXZ.clone().sub(currentPosition).normalize();
                        cartRef.current.position.add(direction.multiplyScalar(speed));
                    }
                } else {
                    setChestOpen(true);
                }
            } else {
                cartTimeout = setTimeout(() => {
                    setStart(true);
                }, 2000);
            }
        }
    });

    return (
        <group position={[2, 3, 2]}>
            <RigidBody type='dynamic' lockRotations colliders='cuboid'>
                <group ref={cartRef} position={[0, 0.2, 0]}>
                    <primitive object={minecart.nodes.Cart} />
                </group>
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

                {chestOpen ? (
                    <group position={[20, -2, 8]} rotation={[0, -(Math.PI / 2), 0]}>
                        <primitive object={wood_chest_open.nodes.Chest_Open} />
                    </group>
                ) : (
                    <group position={[20, -2, 8]} rotation={[0, -(Math.PI / 2), 0]}>
                        <primitive object={wood_chest_close.nodes.Chest_Closed} />
                    </group>
                )}

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