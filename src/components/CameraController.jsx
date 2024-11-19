import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useCollisionObjStore } from "../store/collisionObjStore";
import { useKeyboardControls } from "@react-three/drei";
import { useCartStore } from "../store/cartStore";

const SCENE_POSITIONS = [
    { camera: [20, 50, 23], lookAtOffset: [-10, -10, -23] },
    { camera: [20, 10, 23], lookAtOffset: [-10, -10, -23] },
    { camera: [30, -4, 52], lookAtOffset: [-20, -15, -20] },
    { camera: [50, -20, 62], lookAtOffset: [0, -10, -20] },
];

const collisionLookAt = { sheep: { camera: new Vector3(18.5, 7, 6), lookAtOffset: new Vector3(2, -2, -2) } };

export const CameraController = () => {
    const { ob: collisionOb, seOb, clearOb } = useCollisionObjStore();
    const { state: cartState, setState } = useCartStore();
    const springStrength = 0.03; // 스프링 강도
    const damping = 0.92; // 감쇠 계수

    const currentSceneIndex = useRef(1);
    const transitionProgress = useRef(0);

    const velocity = useRef(new Vector3(0, 0, 0));
    const cameraRef = useRef(null);
    const { set, size } = useThree();
    const currentLookAt = useRef(new Vector3());
    const targetPosition = useRef(new Vector3(...SCENE_POSITIONS[1].camera));
    const targetLookAt = useRef(new Vector3(...SCENE_POSITIONS[1].lookAtOffset));
    const [, get] = useKeyboardControls();

    const calculateLookAtPosition = (cameraPosition, lookAtOffset) => {
        return new Vector3(cameraPosition.x + lookAtOffset.x, cameraPosition.y + lookAtOffset.y, cameraPosition.z + lookAtOffset.z);
    };

    useEffect(() => {
        if (cameraRef.current) {
            // 카메라를 기본 카메라로 설정
            cameraRef.current.aspect = size.width / size.height;
            cameraRef.current.updateProjectionMatrix();

            // 초기 위치 설정
            cameraRef.current.position.set(...SCENE_POSITIONS[0].camera);

            const initialLookAt = calculateLookAtPosition(cameraRef.current.position, new Vector3(...SCENE_POSITIONS[0].lookAtOffset));
            currentLookAt.current.copy(initialLookAt);
            cameraRef.current.lookAt(initialLookAt);

            set({ camera: cameraRef.current });
        }
    }, [set, size]);

    useEffect(() => {
        const handleScroll = (event) => {
            event.preventDefault();

            if (cartState === "done") {
                const direction = event.deltaY > 0 ? 1 : -1;

                const nextIndex = Math.min(Math.max(currentSceneIndex.current + direction, 1), SCENE_POSITIONS.length - 1);

                if (nextIndex !== currentSceneIndex.current) {
                    transitionProgress.current = 0;
                    setState(direction > 0 ? "down" : "up");

                    const mills = direction ? 3000 : 0;

                    setTimeout(() => {
                        currentSceneIndex.current = nextIndex;
                        targetPosition.current.set(...SCENE_POSITIONS[nextIndex].camera);
                        targetLookAt.current.set(...SCENE_POSITIONS[nextIndex].lookAtOffset);
                    }, mills);
                }
            }
        };

        window.addEventListener("wheel", handleScroll, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, [cartState]);

    useFrame((state, delta) => {
        const controls = get();

        if (cameraRef.current && !collisionOb?.name && !controls.space) {
            const currentPos = cameraRef.current.position;
            ["x", "y", "z"].forEach((axis) => {
                const diff = targetPosition.current[axis] - currentPos[axis];
                velocity.current[axis] = diff * springStrength;
                velocity.current[axis] *= damping;
                currentPos[axis] += velocity.current[axis];
            });
            const targetLookAtPos = calculateLookAtPosition(currentPos, targetLookAt.current);

            currentLookAt.current.lerp(targetLookAtPos, 0.1);
            cameraRef.current.lookAt(currentLookAt.current);

            if (cartState !== "done") {
                transitionProgress.current += delta * 0.5; // 전환 속도 조절
                if (transitionProgress.current >= 1) {
                    transitionProgress.current = 1;
                }
            }
        } else {
            if (collisionOb?.name) {
                if (collisionOb?.name === "sheep") {
                    const currentPos = cameraRef.current.position;

                    ["x", "y", "z"].forEach((axis) => {
                        const diff = collisionLookAt["sheep"].camera[axis] - currentPos[axis];
                        velocity.current[axis] = diff * springStrength;
                        velocity.current[axis] *= damping;
                        currentPos[axis] += velocity.current[axis];
                    });

                    const targetLookAtPos = calculateLookAtPosition(currentPos, collisionLookAt["sheep"].lookAtOffset);

                    currentLookAt.current.lerp(targetLookAtPos, 0.1);
                    cameraRef.current.lookAt(currentLookAt.current);
                    console.log(collisionLookAt["sheep"].camera);
                    // const currentPos = cameraRef.current.position;
                    // cameraRef.current.lookAt(new Vector3(0, 0, 0));
                }
            }
        }
    });

    return (
        <perspectiveCamera ref={cameraRef} position={SCENE_POSITIONS[0].camera} aspect={size.width / size.height} near={0.1} far={1000} fov={75} />
    );
};
