import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useCollisionObjStore } from "../store/collisionObjStore";
import { useCartStore } from "../store/cartStore";
import { useSpaceStore } from "../store/spaceStore";

const SCENE_POSITIONS = [
    { camera: [20, 50, 23], lookAtOffset: [-10, -10, -23] },
    { camera: [20, 10, 23], lookAtOffset: [-10, -10, -23], cubeMenPos: [18, 10, 6] },
    { camera: [30, -4, 52], lookAtOffset: [-20, -15, -20], cubeMenPos: [12, -5, 36] },
    { camera: [50, -20, 62], lookAtOffset: [0, -10, -20], cubeMenPos: [50, -25, 42] },
];

const collisionLookAt = {
    sheep: { camera: new Vector3(18.5, 7, 6), lookAtOffset: new Vector3(2, -2, -2) },
    dog: { camera: new Vector3(12, -13, 40), lookAtOffset: new Vector3(-2, -2, 2) },
    horse: { camera: new Vector3(22, -12, 35), lookAtOffset: new Vector3(-2, -2, -2) },
    pig: { camera: new Vector3(24, -12, 35), lookAtOffset: new Vector3(-2, -2, -2) },
};

export const CameraController = ({ rb }) => {
    const { ob: collisionOb, seOb, clearOb } = useCollisionObjStore();
    const { state: cartState, setState } = useCartStore();
    const { space } = useSpaceStore();
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

    const cameraMoveByScene = ({ direction }) => {
        const nextIndex = Math.min(Math.max(currentSceneIndex.current + direction, 1), SCENE_POSITIONS.length - 1);

        if (nextIndex !== currentSceneIndex.current) {
            transitionProgress.current = 0;
            setState(direction > 0 ? "down" : "up");

            const mills = direction ? 3000 : 0;

            setTimeout(() => {
                currentSceneIndex.current = nextIndex;
                targetPosition.current.set(...SCENE_POSITIONS[nextIndex].camera);
                targetLookAt.current.set(...SCENE_POSITIONS[nextIndex].lookAtOffset);

                rb.current.setTranslation(new Vector3(...SCENE_POSITIONS[nextIndex].cubeMenPos));
            }, mills);
        }
    };

    const checkIsFalling = () => {
        if (rb.current) {
            const position = rb.current.translation();
            console.log(position);
            if (currentSceneIndex.current === 1) {
                if (position.y < -10) {
                    rb.current.setTranslation(new Vector3(...SCENE_POSITIONS[currentSceneIndex.current].cubeMenPos));
                }
            } else if (currentSceneIndex.current === 2) {
                if (position.y > 2 || position.y < -30) {
                    rb.current.setTranslation(new Vector3(...SCENE_POSITIONS[currentSceneIndex.current].cubeMenPos));
                }
            } else {
                if (position.y < -50 || position.y > -24) {
                    rb.current.setTranslation(new Vector3(...SCENE_POSITIONS[currentSceneIndex.current].cubeMenPos));
                }
            }
        }
    };

    useEffect(() => {
        const handleScroll = (event) => {
            event.preventDefault();

            if (cartState === "done" && !space) {
                const direction = event.deltaY > 0 ? 1 : -1;
                cameraMoveByScene({ direction });
            }
        };

        window.addEventListener("wheel", handleScroll, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, [cartState, space]);

    useFrame((state, delta) => {
        checkIsFalling();

        if (cameraRef.current) {
            if (collisionOb?.name) {
                if (space) {
                    if (collisionLookAt[collisionOb?.name]) {
                        const currentPos = cameraRef.current.position.clone(); // 현재 카메라 위치
                        const targetPos = new Vector3(...collisionLookAt[collisionOb?.name].camera); // 목표 카메라 위치
                        const diffVec = new Vector3().subVectors(targetPos, currentPos).multiplyScalar(delta); // 이동 벡터 계산
                        currentPos.add(diffVec); // 카메라 이동
                        cameraRef.current.position.copy(currentPos); // 카메라 위치 갱신

                        // 목표 바라볼 위치 계산
                        const targetLookAtPos = new Vector3().addVectors(targetPos, new Vector3(...collisionLookAt[collisionOb?.name].lookAtOffset));

                        // 현재 LookAt 방향 계산
                        const currentLookAt = new Vector3();
                        cameraRef.current.getWorldDirection(currentLookAt); // 카메라의 현재 바라보는 방향 벡터

                        // LookAt 방향 점진적으로 보정
                        const direction = targetLookAtPos.clone().sub(currentPos).normalize();
                        const distance = currentPos.distanceTo(targetLookAtPos);
                        const moveDistance = Math.min(delta, distance);
                        currentLookAt.add(direction.multiplyScalar(moveDistance));
                        cameraRef.current.lookAt(currentPos.clone().add(currentLookAt));
                    }
                }
            } else {
                if (!space) {
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
                }
            }
        }
    });

    return (
        <perspectiveCamera ref={cameraRef} position={SCENE_POSITIONS[0].camera} aspect={size.width / size.height} near={0.1} far={1000} fov={75} />
    );
};
