import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import { MathUtils, Vector3 } from "three";

const rail = [
    { position: [0, 0, 0], rotation: [0, 0, 0], isStop: true },
    { position: [2, 0, 0], rotation: [0, 0, 0] },
    { position: [4, 0, 0], rotation: [0, 0, 0] },
    { position: [6, 0, 0], rotation: [0, 0, 0] },
    { position: [8, 0, 0], rotation: [0, 0, 0] },
    { position: [10, 0, 0], rotation: [0, 0, 0] },
    { position: [12, 0, 0], rotation: [0, 0, 0] },
    { position: [14, 0, 0], rotation: [0, 0, 0] },
    { position: [16, 0, 0], rotation: [0, -(Math.PI / 2), 0], isCorner: true },
    { position: [16, 0, 2], rotation: [0, Math.PI / 2, 0] },
    { position: [16, 0, 4], rotation: [0, Math.PI / 2, 0] },
    { position: [16, 0, 6], rotation: [0, Math.PI / 2, 0] },
    { position: [16, 0, 8], rotation: [0, Math.PI / 2, 0] },
    { position: [16, 0, 10], rotation: [0, Math.PI / 2, 0] },
    { position: [16, 0, 12], rotation: [0, Math.PI / 2, 0] },
    { position: [16, -2, 14], rotation: [0, Math.PI / 2, 0], isIncline: true },
    { position: [16, -4, 16], rotation: [0, Math.PI / 2, 0], isIncline: true },
    { position: [16, -6, 18], rotation: [0, Math.PI / 2, 0], isIncline: true },
    { position: [16, -8, 20], rotation: [0, Math.PI / 2, 0], isIncline: true },
    { position: [16, -10, 22], rotation: [0, Math.PI / 2, 0], isIncline: true },
    { position: [16, -12, 24], rotation: [0, Math.PI / 2, 0], isIncline: true },
    { position: [16, -14, 26], rotation: [0, Math.PI / 2, 0], isIncline: true },
    { position: [16, -16, 28], rotation: [0, Math.PI / 2, 0], isIncline: true },
    { position: [16, -18, 30], rotation: [0, Math.PI / 2, 0], isIncline: true },
    { position: [16, -20, 32], rotation: [0, Math.PI / 2, 0], isIncline: true },
    { position: [16, -20, 34], rotation: [0, Math.PI / 2, 0] },
    { position: [16, -20, 36], rotation: [0, Math.PI / 2, 0], isStop: true },
    { position: [16, -20, 38], rotation: [0, Math.PI / 2, 0] },
    { position: [16, -20, 40], rotation: [0, Math.PI / 2, 0] },
    { position: [16, -20, 42], rotation: [0, Math.PI / 2, 0], isCorner: true },
    { position: [18, -20, 42], rotation: [0, 0, 0] },
    { position: [20, -20, 42], rotation: [0, 0, 0] },
    { position: [22, -20, 42], rotation: [0, 0, 0] },
    { position: [24, -20, 42], rotation: [0, 0, 0] },
    { position: [26, -22, 42], rotation: [0, Math.PI, 0], isIncline: true },
    { position: [28, -24, 42], rotation: [0, Math.PI, 0], isIncline: true },
    { position: [30, -26, 42], rotation: [0, Math.PI, 0], isIncline: true },
    { position: [32, -28, 42], rotation: [0, Math.PI, 0], isIncline: true },
    { position: [34, -30, 42], rotation: [0, Math.PI, 0], isIncline: true },
    { position: [36, -32, 42], rotation: [0, Math.PI, 0], isIncline: true },
    { position: [38, -34, 42], rotation: [0, Math.PI, 0], isIncline: true },
    { position: [40, -36, 42], rotation: [0, Math.PI, 0], isIncline: true },
    { position: [42, -38, 42], rotation: [0, Math.PI, 0], isIncline: true },
    { position: [44, -40, 42], rotation: [0, Math.PI, 0], isIncline: true },
    { position: [46, -40, 42], rotation: [0, 0, 0] },
    { position: [48, -40, 42], rotation: [0, 0, 0] },
    { position: [50, -40, 42], rotation: [0, 0, 0] },
    { position: [52, -40, 42], rotation: [0, 0, 0] },
    { position: [54, -40, 42], rotation: [0, 0, 0] },
    { position: [56, -40, 42], rotation: [0, 0, 0] },
    { position: [58, -40, 42], rotation: [0, 0, 0] },
    { position: [60, -40, 42], rotation: [0, Math.PI, 0], isCorner: true },
    { position: [60, -40, 40], rotation: [0, Math.PI / 2, 0] },
    { position: [60, -40, 38], rotation: [0, Math.PI / 2, 0] },
    { position: [60, -40, 36], rotation: [0, Math.PI / 2, 0] },
    { position: [60, -40, 34], rotation: [0, Math.PI / 2, 0] },
    { position: [60, -40, 32], rotation: [0, Math.PI / 2, 0] },
    { position: [60, -40, 30], rotation: [0, Math.PI / 2, 0], isStop: true },
];

export const Rail = ({ cartState, scrollState }) => {
    const cartRef = useRef();
    const currentRailIndex = useRef(0);
    let speed = 0.1;

    const { nodes: rail_corner } = useGLTF("./models/minecreft/Rail Corner.glb");
    const { nodes: rail_incline } = useGLTF("./models/minecreft/Rail Incline.glb");
    const { nodes: rail_straight } = useGLTF("./models/minecreft/Rail Straight.glb");
    const minecart = useGLTF("./models/minecreft/minecart.glb");

    useFrame((state, delta) => {
        if (cartState.current !== "done") {
            if (cartRef.current && rail.length > 0) {
                if (currentRailIndex.current < rail.length) {
                    const currentRail = rail[currentRailIndex.current];

                    const currentPosition = cartRef.current.position.clone();
                    const targetPosition = new Vector3(...rail[currentRailIndex.current].position);
                    const targetPositionXZ = targetPosition
                        .clone()
                        .setY(rail[currentRailIndex.current]?.isIncline ? targetPosition.y + 2 : targetPosition.y + 1);
                    const targetRotation = new Vector3(...rail[currentRailIndex.current].rotation);

                    // 목표 위치에 도달했는지 확인
                    const distance = currentPosition.distanceTo(targetPositionXZ);
                    if (distance < 0.1) {
                        // 다음 레일 섹션으로 이동
                        currentRailIndex.current += cartState.current === "down" ? 1 : -1;

                        if (rail[currentRailIndex.current]?.isStop) {
                            cartState.current = "done";
                        }
                    } else {
                        const progress = 1 - distance / 2;

                        speed = currentRail.isIncline ? 0.17 : currentRail.isCorner ? 0.13 : 0.1;

                        // 내리막길
                        if (rail[currentRailIndex.current]?.isIncline) {
                            if (targetPositionXZ.x / 2 < cartRef.current.position.x) {
                                cartRef.current.rotation.z = MathUtils.lerp(cartRef.current.rotation.z, -(Math.PI / 4), progress);
                            }
                            if ((targetPositionXZ.x / 4) * 3 > cartRef.current.position.x) {
                                cartRef.current.rotation.z = MathUtils.lerp(cartRef.current.rotation.z, 0, progress);
                            }
                        } else if (rail[currentRailIndex.current]?.isCorner) {
                            cartRef.current.rotation.z = MathUtils.lerp(cartRef.current.rotation.z, 0, progress);

                            if (targetRotation.y * (180 / Math.PI) === -90) {
                                cartRef.current.rotation.y = MathUtils.lerp(
                                    cartRef.current.rotation.y,
                                    cartState.current === "down" ? -(Math.PI / 2) : 0,
                                    progress
                                );
                            } else if (targetRotation.y * (180 / Math.PI) === 90) {
                                cartRef.current.rotation.y = MathUtils.lerp(
                                    cartRef.current.rotation.y,
                                    cartState.current === "down" ? 0 : -(Math.PI / 2),
                                    progress
                                );
                            } else if (targetRotation.y * (180 / Math.PI) === 180) {
                                cartRef.current.rotation.y = MathUtils.lerp(
                                    cartRef.current.rotation.y,
                                    cartState.current === "down" ? Math.PI / 2 : 0,
                                    progress
                                );
                            } else if (targetRotation.y * (180 / Math.PI) === 270) {
                                cartRef.current.rotation.y = MathUtils.lerp(
                                    cartRef.current.rotation.y,
                                    cartState.current === "down" ? Math.PI : Math.PI / 2,
                                    progress
                                );
                            }
                        } else {
                            cartRef.current.rotation.z = MathUtils.lerp(0, 0, progress);
                        }
                        // 목표 위치로 슬라이드
                        const direction = targetPositionXZ.clone().sub(currentPosition).normalize();
                        cartRef.current.position.add(direction.multiplyScalar(speed));
                    }
                } else {
                    scrollState.current = "done";
                }
            }
        }
    });

    return (
        <group position={[0, 1, 2]}>
            <RigidBody type='dynamic' lockRotations colliders='cuboid'>
                <group ref={cartRef} position={[0, 1, 0]}>
                    <primitive object={minecart.nodes.Cart} />
                </group>
            </RigidBody>
            <RigidBody type='fixed' colliders='trimesh'>
                {(rail || []).map((data, index) => {
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
            </RigidBody>
        </group>
    );
};
