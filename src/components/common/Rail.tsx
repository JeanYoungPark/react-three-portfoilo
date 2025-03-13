import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useMemo, useRef } from "react";
import { Euler, Group, Quaternion, Vector3 } from "three";
import { useCartStore } from "../../store/cartStore";
import { RAIL_SEGMENTS, SPEED } from "../../constants/railConstants";
import { RailSegment } from "../../types/rail";

export const Rail = () => {
    const rigidBodyRef = useRef<RapierRigidBody | null>(null);
    const cartRef = useRef<Group | null>(null);
    const currentRailIndex = useRef(0);
    const cartRotationTarget = useRef(0);
    const { state: cartState, setState } = useCartStore();

    const { nodes: railCorner } = useGLTF("./models/minecreft/Rail Corner.glb");
    const { nodes: railIncline } = useGLTF("./models/minecreft/Rail Incline.glb");
    const { nodes: railStraight } = useGLTF("./models/minecreft/Rail Straight.glb");
    const { nodes: minecartModel } = useGLTF("./models/minecreft/minecart.glb");

    const calculateNextPosition = ({
        currentRail,
        currentPosition,
        position,
    }: {
        currentRail: RailSegment;
        currentPosition: Vector3;
        position: { x: number; y: number; z: number };
    }) => {
        const inclinePos = currentRail?.isIncline ? 1 : 0;
        const realNextPosition = new Vector3(currentPosition.x, currentPosition.y + 4.2 + inclinePos, currentPosition.z + 2);

        return {
            x: realNextPosition.x - position.x,
            y: realNextPosition.y - position.y,
            z: realNextPosition.z - position.z,
            realNextPosition,
        };
    };

    const calculateRotation = ({ x, y, z }: { x: number; y: number; z: number }) => {
        const distanceXZ = Math.sqrt(x * x + z * z);
        const yRatio = y / distanceXZ;

        const cartRotation = Math.atan2(x, z);
        const tiltForward = Math.atan2(y, Math.abs(z));
        const tiltSide = Math.atan2(y, Math.abs(x));

        const clampedForward = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, tiltForward));
        const clampedSide = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, tiltSide));

        return { cartRotation, clampedForward, clampedSide, yRatio };
    };

    useFrame((_, delta) => {
        if (cartState === "done") return;

        const rb = rigidBodyRef.current;
        if (!rb || currentRailIndex.current < 0 || currentRailIndex.current >= RAIL_SEGMENTS.length) return;

        const position = rb.translation();
        const currentRail = RAIL_SEGMENTS[currentRailIndex.current];
        const nextRailIndex = currentRailIndex.current + (cartState === "down" ? 1 : -1);
        const nextRail = RAIL_SEGMENTS[nextRailIndex];

        if (!nextRail) return;

        const currentPosition = new Vector3(...currentRail.position);
        const { x, y, z } = calculateNextPosition({ currentRail, currentPosition, position });

        if (Math.abs(x) > 0.1 || Math.abs(y) > 0.1 || Math.abs(z) > 0.1) {
            const { cartRotation, clampedForward, clampedSide, yRatio } = calculateRotation({ x, y, z });
            cartRotationTarget.current = cartRotation;

            const newPos = {
                x: position.x + Math.sin(cartRotationTarget.current) * SPEED * delta,
                y: position.y + yRatio * SPEED * delta,
                z: position.z + Math.cos(cartRotationTarget.current) * SPEED * delta,
            };

            rb.setTranslation(newPos, true);

            const rotationQuat = new Quaternion().setFromEuler(
                new Euler(
                    Math.abs(z) > 0.1 ? (z > 0.1 ? -clampedForward : clampedForward) : 0,
                    0,
                    Math.abs(x) > 0.1 ? (x > 0.1 ? clampedSide : -clampedSide) : 0,
                    "ZYX"
                )
            );

            rb.setRotation(rotationQuat, true);
        } else {
            currentRailIndex.current += cartState === "down" ? 1 : -1;
            if (RAIL_SEGMENTS[currentRailIndex.current]?.isStop) {
                setState("done");
            }
        }
    });

    const railMeshes = useMemo(
        () =>
            (RAIL_SEGMENTS || []).map((data, index) => {
                const mesh = data.isCorner
                    ? railCorner.Rail_Corner.clone()
                    : data.isIncline
                    ? railIncline.Rail_Incline.clone()
                    : railStraight.Rail_Straight.clone();

                return (
                    <group key={index} position={data.position} rotation={data.rotation}>
                        <primitive object={mesh} />
                    </group>
                );
            }),
        [railCorner, railIncline, railStraight]
    );

    return (
        <group position={[0, 1, 2]}>
            <RigidBody type='kinematicPosition' lockRotations colliders={false} mass={1} position={[0, 0.2, 0]} ref={rigidBodyRef}>
                <group ref={cartRef}>
                    <primitive object={minecartModel.Cart} />
                </group>
                <CuboidCollider args={[1, 0.7, 1]} position={[0, 0.7, 0]} />
            </RigidBody>
            <RigidBody type='fixed' colliders='trimesh'>
                {railMeshes}
            </RigidBody>
        </group>
    );
};
