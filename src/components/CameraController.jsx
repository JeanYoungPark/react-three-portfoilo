import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const SCENE_POSITIONS = [
    { camera: [20, 50, 23], lookAtOffset: [-10, -10, -23] },
    { camera: [20, 10, 23], lookAtOffset: [-10, -10, -23] },
    { camera: [30, -4, 52], lookAtOffset: [-20, -15, -20] },
];

export const CameraController = ({ cartState }) => {
    const springStrength = 0.1; // 스프링 강도
    const damping = 0.5; // 감쇠 계수

    const currentSceneIndex = useRef(1);
    const scrollState = useRef("done");

    const velocity = useRef(new Vector3(0, 0, 0));
    const cameraRef = useRef(null);
    const { set, size } = useThree();
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

                const nextIndex = Math.min(Math.max(currentSceneIndex.current + direction, 1), SCENE_POSITIONS.length - 1);

                if (nextIndex !== currentSceneIndex.current) {
                    cartState.current = "start";

                    setTimeout(() => {
                        scrollState.current = direction > 0 ? "down" : "up";
                        targetPosition.current.set(...SCENE_POSITIONS[nextIndex].camera);
                        targetLookAt.current.set(...SCENE_POSITIONS[nextIndex].lookAtOffset);
                    }, 10000);
                }
            }
        };

        // window.addEventListener("wheel", handleScroll, { passive: false });

        // return () => {
        //     window.removeEventListener("wheel", handleScroll);
        // };
    }, []);

    // useFrame(() => {
    //     if (cameraRef.current) {
    //         const currentPos = cameraRef.current.position;

    //         const distance = currentPos.distanceTo(targetPosition.current);
    //         if (distance > 0.1) {
    //             ["x", "y", "z"].forEach((axis) => {
    //                 const diff = targetPosition.current[axis] - currentPos[axis];
    //                 velocity.current[axis] = diff * springStrength;
    //                 velocity.current[axis] *= damping;
    //                 currentPos[axis] += velocity.current[axis];
    //             });

    //             // 직접 lookAt 적용
    //             const initialLookAt = calculateLookAtPosition(currentPos, targetLookAt.current);
    //             cameraRef.current.lookAt(initialLookAt);
    //         } else {
    //             scrollState.current = "done";
    //         }
    //     }
    // });

    return (
        <perspectiveCamera ref={cameraRef} position={SCENE_POSITIONS[0].camera} aspect={size.width / size.height} near={0.1} far={1000} fov={75} />
    );
};
