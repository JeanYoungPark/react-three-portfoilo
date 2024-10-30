import React, { useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

// Three.js에서 필요한 객체들을 react-three-fiber에 확장
extend({ Points: THREE.Points, BufferGeometry: THREE.BufferGeometry, PointsMaterial: THREE.PointsMaterial });

export const Particles = ({ count }) => {
    const particlesRef = useRef();

    // 파티클 위치 데이터 생성
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count); // 각 파티클의 크기를 조절하기 위한 배열

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 80; // x 위치
        positions[i * 3 + 1] = (Math.random() - 0.5) * 80; // y 위치
        positions[i * 3 + 2] = (Math.random() - 0.5) * 60; // z 위치
        scales[i] = Math.random();
    }

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.0005;
            particlesRef.current.rotation.x += 0.0005;

            // 각 파티클의 크기와 투명도 변경
            const time = state.clock.getElapsedTime();
            for (let i = 0; i < count; i++) {
                scales[i] = 0.5 + 0.5 * Math.sin(time * 2 + i); // 부드럽게 커졌다 작아지는 효과
            }
            particlesRef.current.geometry.attributes.scale.needsUpdate = true;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry attach='geometry'>
                <bufferAttribute attach='attributes-position' array={positions} count={count} itemSize={3} />
                <bufferAttribute attach='attributes-scale' array={scales} count={count} itemSize={1} />
            </bufferGeometry>
            <pointsMaterial attach='material' color='#FFE5B4' size={0.1} sizeAttenuation transparent opacity={0.8} />
        </points>
    );
};
