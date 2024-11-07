import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export const CameraController = ({ initialPosition }) => {
    const springStrength = 0.1; // 스프링 강도
    const damping = 0.8; // 감쇠 계수
    const numScenes = 3;
    const sceneHeight = 50;

    const velocity = useRef(0);
    const cameraRef = useRef();
    const { set, size } = useThree();
    const scrollState = useRef("done");
    const targetPosition = useRef(initialPosition[1] - sceneHeight);
    const cameraPosition = useRef(initialPosition); // 카메라 위치를 저장할 ref

    useEffect(() => {
        if (cameraRef.current) {
            // 카메라를 기본 카메라로 설정
            cameraRef.current.aspect = size.width / size.height;
            cameraRef.current.updateProjectionMatrix();
            set({ camera: cameraRef.current });
        }
    }, [set, size]);

    useEffect(() => {
        const handleScroll = (event) => {
            event.preventDefault();
            if (scrollState.current === "done") {
                scrollState.current = event.deltaY > 0 ? "down" : "up"; // 스크롤 방향에 따라 카메라 이동
                targetPosition.current = event.deltaY > 0 ? targetPosition.current - sceneHeight : targetPosition.current + sceneHeight;
            }
        };

        window.addEventListener("wheel", handleScroll, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, [initialPosition, numScenes, sceneHeight]);

    useFrame(() => {
        if (cameraRef.current) {
            if (scrollState.current !== "done") {
                if (targetPosition.current - cameraRef.current.position.y < 1) {
                    scrollState.current = "done";
                }
            }

            // 현재 Y 위치와 목표 Y 위치의 차이 계산
            const diff = targetPosition.current - cameraRef.current.position.y;

            // 스프링 힘을 적용
            velocity.current = diff * springStrength;

            // 감쇠 적용
            velocity.current *= damping;

            // 위치 업데이트
            cameraRef.current.position.x = cameraPosition.current[0];
            cameraRef.current.position.y += velocity.current;
            cameraRef.current.position.x = cameraPosition.current[2];

            cameraRef.current.lookAt(cameraPosition.current[0] - 10, cameraRef.current.position.y - 10, 0);
        }
    });

    return <perspectiveCamera ref={cameraRef} position={initialPosition} aspect={size.width / size.height} near={0.1} far={1000} fov={75} />;
};
