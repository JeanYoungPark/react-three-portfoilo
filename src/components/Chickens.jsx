import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import { Box3, MathUtils, Vector3 } from "three";

export const Chickens = (ref) => {
    const chickRef = useRef();
    const meshRef = useRef();
    const [targetPosition, setTargetPosition] = useState(new Vector3(0, 0, 0));

    const chick = useGLTF("./models/minecreft/Chick.glb");
    const { actions } = useAnimations(chick.animations, chickRef);

    // 울타리 경계 설정
    const [fenceBounds, setFenceBounds] = useState(null);

    // 목표 위치를 랜덤으로 설정
    const setRandomTarget = () => {
        if (fenceBounds) {
            const randomX = MathUtils.randFloat(fenceBounds.min.x, fenceBounds.max.x);
            const randomZ = MathUtils.randFloat(fenceBounds.min.z, fenceBounds.max.z);
            setTargetPosition(new Vector3(randomX, 0, randomZ));
        }
    };

    useEffect(() => {
        if (ref.fenceRef.current) {
            const box = new Box3().setFromObject(ref.fenceRef.current);
            setFenceBounds(box); // 울타리 경계 설정
            setRandomTarget();
        }
    }, [ref.fenceRef]);

    useEffect(() => {
        if (actions) {
            actions["AnimalArmature|AnimalArmature|AnimalArmature|Idle"]?.play();
            return () => actions["AnimalArmature|AnimalArmature|AnimalArmature|Idle"]?.fadeOut(0.24);
        }
    }, [actions]);

    useFrame(() => {
        if (!fenceBounds) return;

        const translation = chickRef.current.translation(); // Rapier에서 물리적인 위치 값 가져오기
        const currentPosition = new Vector3(translation.x, 0, translation.z); // Three.js의 Vector3로 변환
        const direction = new Vector3().subVectors(targetPosition, currentPosition).normalize();
        const distance = currentPosition.distanceTo(targetPosition);
        console.log(distance);
        // 목표 위치로 이동
        // if (distance > 0.1) {
        //     const step = direction.multiplyScalar(0.05); // 이동 속도 조절
        //     console.log(step);
        //     const newPosition = currentPosition.clone().add(step);

        //     // 울타리 경계 확인
        //     if (!fenceBounds.containsPoint(newPosition)) {
        //         chickRef.current.setTranslation(newPosition, true); // Chick의 위치 업데이트
        //         meshRef.current.lookAt(targetPosition);
        //     }
        // } else {
        //     setRandomTarget(); // 목표 위치 도달 시 새로운 위치 설정
        // }
    });

    return (
        <RigidBody colliders={false} lockRotations ref={chickRef} onCollisionEnter={setRandomTarget}>
            {/* 그룹 */}
            <group position={[4, 2, 7]} dispose={null}>
                <primitive object={chick.nodes.AnimalArmature} />
                <skinnedMesh
                    ref={meshRef}
                    name='chick1'
                    geometry={chick.nodes.Chicken.geometry}
                    material={chick.materials.AtlasMaterial}
                    skeleton={chick.nodes.Chicken.skeleton}
                />
            </group>

            {/* 캡슐 콜라이더 */}
            <CapsuleCollider args={[0.08, 0.15]} />
        </RigidBody>
    );
};
