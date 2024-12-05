import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React, { useRef } from "react";
import { Euler, Quaternion, Vector3 } from "three";
import { useCartStore } from "../../store/cartStore";

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
    { position: [16, -20, 36], rotation: [0, Math.PI / 2, 0] },
    { position: [16, -20, 38], rotation: [0, Math.PI / 2, 0], isStop: true },
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
    const cartRotationTarget = useRef(0);
    const { state: cartState, setState } = useCartStore();
    let speed = 12;

    const { nodes: rail_corner } = useGLTF("./models/minecreft/Rail Corner.glb");
    const { nodes: rail_incline } = useGLTF("./models/minecreft/Rail Incline.glb");
    const { nodes: rail_straight } = useGLTF("./models/minecreft/Rail Straight.glb");
    const minecart = useGLTF("./models/minecreft/minecart.glb");

    useFrame((state, delta) => {
        if (cartState !== "done") {
            if (rb.current && currentRailIndex.current > -1 && currentRailIndex.current < rail.length) {
                const position = rb.current.translation();
                const currentRail = rail[currentRailIndex.current];
                const nextRail = rail[currentRailIndex.current + (cartState === "down" ? 1 : -1)];
                const inclinePos = currentRail?.isIncline ? 1 : 0;

                if (!nextRail) return;

                const currentPosition = new Vector3(...currentRail.position);

                const realNextPosition = new Vector3(
                    currentPosition.x, // group x position
                    currentPosition.y + 4.2 + inclinePos, // group y position
                    currentPosition.z + 2 // group z position
                );

                const dx = realNextPosition.x - position.x;
                const dz = realNextPosition.z - position.z;
                const dy = realNextPosition.y - position.y;

                // 방향 벡터 계산
                if (Math.abs(dx) > 0.1 || Math.abs(dz) > 0.1 || Math.abs(dy) > 0.1) {
                    cartRotationTarget.current = Math.atan2(dx, dz);

                    const distanceXZ = Math.sqrt(dx * dx + dz * dz); // 평면 거리
                    const yRatio = dy / distanceXZ;

                    const newPos = {
                        x: position.x + Math.sin(cartRotationTarget.current) * speed * delta,
                        y: position.y + yRatio * speed * delta,
                        z: position.z + Math.cos(cartRotationTarget.current) * speed * delta,
                    };

                    rb.current.setTranslation(newPos, true);

                    // 기울기 계산
                    const tiltForward = Math.atan2(dy, Math.abs(dz)); // X축 기울기 (앞뒤)
                    const tiltSide = Math.atan2(dy, Math.abs(dx)); // Z축 기울기 (좌우)

                    // 제한된 각도 적용 (±45도 제한)
                    const clampedForward = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, tiltForward));
                    const clampedSide = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, tiltSide));

                    // 회전 적용
                    if (Math.abs(dz) > 0.1) {
                        const rotationQuat = new Quaternion().setFromEuler(
                            new Euler(dz > 0.1 ? -clampedForward : clampedForward, 0, 0) // 순서: X, Y, Z
                        );
                        rb.current.setRotation(rotationQuat, true);
                    } else if (Math.abs(dx) > 0.1) {
                        const rotationQuat = new Quaternion().setFromEuler(
                            new Euler(0, 0, dx > 0.1 ? clampedSide : -clampedSide) // 순서: X, Y, Z
                        );
                        rb.current.setRotation(rotationQuat, true);
                    }
                } else {
                    currentRailIndex.current += cartState === "down" ? 1 : -1;
                    if (rail[currentRailIndex.current]?.isStop) {
                        setState("done");
                    }
                }
            }
        }
    });

    return (
        <group position={[0, 1, 2]}>
            <RigidBody type='kinematicPosition' lockRotations colliders={false} mess={1} position={[0, 0.2, 0]} ref={rb}>
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
