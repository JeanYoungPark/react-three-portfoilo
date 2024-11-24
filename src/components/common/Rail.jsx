import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React, { useRef } from "react";
import { MathUtils, Vector3 } from "three";
import { useCartStore } from "../../store/cartStore";
import { useSpaceStore } from "../../store/spaceStore";
import { lerpAngle } from "../../utils/angleUtils";

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

export const Rail = () => {
    const rb = useRef();
    const cartRef = useRef();
    const currentRailIndex = useRef(0);
    const rotationTarget = useRef(0);
    const cartRotationTarget = useRef(0);
    const { state: cartState, setState } = useCartStore();
    const { space } = useSpaceStore();
    let speed = 0.1;

    const { nodes: rail_corner } = useGLTF("./models/minecreft/Rail Corner.glb");
    const { nodes: rail_incline } = useGLTF("./models/minecreft/Rail Incline.glb");
    const { nodes: rail_straight } = useGLTF("./models/minecreft/Rail Straight.glb");
    const minecart = useGLTF("./models/minecreft/minecart.glb");

    useFrame((state, delta) => {
        if (rb.current) {
            const vel = rb.current.linvel();
            const currentPosition = rb.current.translation();
            const targetPosition = new Vector3(...rail[currentRailIndex.current].position);
            const realTargetPosition = new Vector3(
                targetPosition.x + 0, // group x position
                targetPosition.y + 1, // group y position
                targetPosition.z + 2 // group z position
            );

            // const movement = new Vector3().subVectors(currentPosition, realTargetPosition);
            const distance = new Vector3().subVectors(currentPosition, realTargetPosition).length();
            console.log(distance, vel, realTargetPosition);

            if (distance < 0.5) {
                // 0.5는 임계값, 조절 가능
                currentRailIndex.current += 1;
            }
            // if (movement.x === 0 && movement.y === 0 && movement.x === 0) {
            //     currentRailIndex.current += 1;
            //     return;
            // }

            const movement = new Vector3().subVectors(currentPosition, realTargetPosition);

            if (movement.x !== 0 || movement.z !== 0) {
                cartRotationTarget.current = Math.atan2(movement.x > 0 ? -1 : 1, movement.z > 0 ? -1 : 0);

                vel.x += Math.sin(rotationTarget.current + cartRotationTarget.current) * 0.3;
                vel.z = Math.cos(rotationTarget.current + cartRotationTarget.current) * 0.3;
            }

            rb.current.setLinvel(vel, true);
            // cartRef.current.rotation.y = lerpAngle(cartRef.current.rotation.y, cartRotationTarget.current, 0.1);
        }

        if (cartState !== "done") {
            if (cartRef.current && rail.length > 0) {
                if (currentRailIndex.current < rail.length) {
                    // const currentRail = rail[currentRailIndex.current];
                    // const currentPosition = cartRef.current.position.clone();
                    // const targetPosition = new Vector3(...rail[currentRailIndex.current].position);
                    // const targetPositionXZ = targetPosition
                    //     .clone()
                    //     .setY(rail[currentRailIndex.current]?.isIncline ? targetPosition.y + 2 : targetPosition.y + 1);
                    // const targetRotation = new Vector3(...rail[currentRailIndex.current].rotation);
                    // // 목표 위치에 도달했는지 확인
                    // const distance = currentPosition.distanceTo(targetPositionXZ);
                    // if (distance < 0.1) {
                    //     // 다음 레일 섹션으로 이동
                    //     currentRailIndex.current += cartState === "down" ? 1 : -1;
                    //     if (rail[currentRailIndex.current]?.isStop) {
                    //         setState("done");
                    //     }
                    // } else {
                    //     const progress = 1 - distance / 2;
                    //     speed = currentRail.isIncline ? 0.17 : currentRail.isCorner ? 0.13 : 0.1;
                    //     // 내리막길
                    //     if (rail[currentRailIndex.current]?.isIncline) {
                    //         if (targetPositionXZ.x / 2 < cartRef.current.position.x) {
                    //             cartRef.current.rotation.z = MathUtils.lerp(cartRef.current.rotation.z, -(Math.PI / 4), progress);
                    //         }
                    //         if ((targetPositionXZ.x / 4) * 3 > cartRef.current.position.x) {
                    //             cartRef.current.rotation.z = MathUtils.lerp(cartRef.current.rotation.z, 0, progress);
                    //         }
                    //     } else if (rail[currentRailIndex.current]?.isCorner) {
                    //         cartRef.current.rotation.z = MathUtils.lerp(cartRef.current.rotation.z, 0, progress);
                    //         if (targetRotation.y * (180 / Math.PI) === -90) {
                    //             cartRef.current.rotation.y = MathUtils.lerp(
                    //                 cartRef.current.rotation.y,
                    //                 cartState === "down" ? -(Math.PI / 2) : 0,
                    //                 progress
                    //             );
                    //         } else if (targetRotation.y * (180 / Math.PI) === 90) {
                    //             cartRef.current.rotation.y = MathUtils.lerp(
                    //                 cartRef.current.rotation.y,
                    //                 cartState === "down" ? 0 : -(Math.PI / 2),
                    //                 progress
                    //             );
                    //         } else if (targetRotation.y * (180 / Math.PI) === 180) {
                    //             cartRef.current.rotation.y = MathUtils.lerp(
                    //                 cartRef.current.rotation.y,
                    //                 cartState === "down" ? Math.PI / 2 : 0,
                    //                 progress
                    //             );
                    //         } else if (targetRotation.y * (180 / Math.PI) === 270) {
                    //             cartRef.current.rotation.y = MathUtils.lerp(
                    //                 cartRef.current.rotation.y,
                    //                 cartState === "down" ? Math.PI : Math.PI / 2,
                    //                 progress
                    //             );
                    //         }
                    //     } else {
                    //         cartRef.current.rotation.z = MathUtils.lerp(0, 0, progress);
                    //     }
                    //     // 목표 위치로 슬라이드
                    //     const direction = targetPositionXZ.clone().sub(currentPosition).normalize();
                    //     cartRef.current.position.add(direction.multiplyScalar(speed));
                    // }
                }
            }
        }
    });

    return (
        <group position={[0, 1, 2]}>
            <RigidBody type='dynamic' lockRotations colliders={false} mess={1} position={[0, 1, 0]} ref={rb}>
                <group ref={cartRef}>
                    <primitive object={minecart.nodes.Cart} />
                </group>
                <CuboidCollider args={[1, 0.7, 1]} position={[0, 0.7, 0]} />
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
