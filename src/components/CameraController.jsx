import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const SCENE_POSITIONS = [
    // { camera: [20, 50, 23], lookAtOffset: [-10, -10, 0] },
    { camera: [20, 10, 23], lookAtOffset: [-1, -1, 0] },
    { camera: [20, 10, 23], lookAtOffset: [-10, -10, 0] },
    // { camera: [30, -4, 52], lookAt: [-25, -40, 0] },
];
// [([18, 60, 23], [18, 10, 23], [])];

export const CameraController = () => {
    const springStrength = 0.1; // 스프링 강도
    const damping = 0.1; // 감쇠 계수
    const currentSceneIndex = useRef(1);

    const velocity = useRef(new Vector3(0, 0, 0));
    const cameraRef = useRef(null);
    const { set, size } = useThree();
    const scrollState = useRef("done");
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
            cameraRef.current.lookAt(initialLookAt);

            set({ camera: cameraRef.current });
        }
    }, [set, size]);

    useEffect(() => {
        const handleScroll = (event) => {
            event.preventDefault();

            if (scrollState.current === "done") {
                const direction = event.deltaY > 0 ? 1 : -1;

                const nextIndex = Math.min(Math.max(currentSceneIndex.current + direction, 0), SCENE_POSITIONS.length - 1);

                if (nextIndex !== currentSceneIndex.current) {
                    currentSceneIndex.current = nextIndex;
                    targetPosition.current.set(...SCENE_POSITIONS[nextIndex].camera);
                    targetLookAt.current.set(...SCENE_POSITIONS[nextIndex].lookAtOffset);
                    scrollState.current = direction > 0 ? "down" : "up";
                }
            }
        };

        window.addEventListener("wheel", handleScroll, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);

    useFrame(() => {
        if (cameraRef.current) {
            const currentPos = cameraRef.current.position;
            const currentLookAt = cameraRef.current.lookAt;

            const distance = currentPos.distanceTo(targetPosition.current);
            if (distance > 0.1) {
                ["x", "y", "z"].forEach((axis) => {
                    const diff = targetPosition.current[axis] - currentPos[axis];
                    velocity.current[axis] = diff * springStrength;
                    velocity.current[axis] *= damping;
                    currentPos[axis] += velocity.current[axis];
                });

                // 직접 lookAt 적용
                const initialLookAt = calculateLookAtPosition(currentPos, targetLookAt.current);
                console.log(initialLookAt);
                cameraRef.current.lookAt(initialLookAt);

                // const currentLookAt = new Vector3();
                // console.log(currentLookAt);
                // cameraRef.current.getWorldDirection(currentLookAt);
                //     const targetDirection = targetLookAt.current.clone().sub(currentPos).normalize();
                //     const newDirection = currentLookAt.lerp(targetDirection, 0.1);
                //     const lookAtPoint = currentPos.clone().add(newDirection.multiplyScalar(10));
                //     cameraRef.current.lookAt(lookAtPoint);

                // cameraRef.current.position.lerp(targetPosition, 0.1);
            } else {
                scrollState.current = "done";
            }

            // const totalDiff = currentPos.distanceTo(targetPosition.current);
            // console.log(totalDiff);
            // if (totalDiff < 0.1) {
            //     scrollState.current = "done";
            // } else {
            // const currentLookAt = new Vector3();
            // cameraRef.current.getWorldDirection(currentLookAt);
            // const targetDirection = targetLookAt.current.clone().sub(currentPos).normalize();
            // const newDirection = currentLookAt.lerp(targetDirection, 0.1);
            // const lookAtPoint = currentPos.clone().add(newDirection.multiplyScalar(10));
            // cameraRef.current.lookAt(lookAtPoint);
            // }
            // const diff = targetPosition.current.y - cameraRef.current.position.y;
            // console.log(diff);
            // 스프링 힘을 적용
            // velocity.current = diff * springStrength;
            // 감쇠 적용
            // velocity.current *= damping;
            // 위치 업데이트
            // cameraRef.current.position.x = cameraPosition.current[0];
            // cameraRef.current.position.y += velocity.current;
            // cameraRef.current.position.x = cameraPosition.current[2];
            // cameraRef.current.lookAt(cameraPosition.current.x - 10, cameraRef.current.position.y - 10, cameraPosition.current.z);
        }
    });

    return (
        <perspectiveCamera ref={cameraRef} position={SCENE_POSITIONS[0].camera} aspect={size.width / size.height} near={0.1} far={1000} fov={75} />
    );
};
