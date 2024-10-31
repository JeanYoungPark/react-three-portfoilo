import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import { AnimationMixer, Box3, MathUtils, Vector3, Quaternion, Matrix4 } from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { useFence } from "../../hook/main/useFence";

let eatTimeout = null;

export const Chick = ({ fenceRef, position }) => {
    const group = useRef();
    const [animation, setAnimation] = useState("Idle");
    const [isEating, setIsEating] = useState(false);
    const currentVelocity = useRef(new Vector3());
    const targetRotation = useRef(new Quaternion());
    const currentRotation = useRef(new Quaternion());

    const chick = useGLTF("./models/minecreft/Chick.glb");
    const clone = SkeletonUtils.clone(chick.scene);
    const mixerRef = useRef();

    const { fenceBounds, calculateInnerBounds, targetPosition, setRandomTarget } = useFence({ fenceRef, group });

    // 상수 정의
    const MOVEMENT_SPEED = 2; // 고정 속도
    const ROTATION_SPEED = 8; // 회전 속도
    const DISTANCE_THRESHOLD = 0.2;

    useEffect(() => {
        return () => {
            if (eatTimeout) {
                clearTimeout(eatTimeout);
            }
        };
    }, []);

    useEffect(() => {
        if (clone) {
            const mixer = new AnimationMixer(clone);
            if (chick.animations.length > 0) {
                const anim = chick.animations.find((data) => data.name === `AnimalArmature|AnimalArmature|AnimalArmature|${animation}`);
                if (anim) {
                    // 이전 애니메이션 정리
                    mixer.stopAllAction();
                    const action = mixer.clipAction(anim);
                    action.reset().fadeIn(0.2).play();
                }
            }
            mixerRef.current = mixer;
        }
    }, [clone, animation]);

    const updateRotation = (delta, targetDir) => {
        if (targetDir.lengthSq() > 0.001) {
            // 목표 회전 계산
            const targetQuaternion = new Quaternion();
            targetQuaternion.setFromRotationMatrix(new Matrix4().lookAt(new Vector3(), targetDir, new Vector3(0, 1, 0)));

            // 부드러운 회전 적용
            currentRotation.current.slerp(targetQuaternion, ROTATION_SPEED * delta);
            group.current.quaternion.copy(currentRotation.current);
        }
    };

    useFrame((state, delta) => {
        if (!fenceBounds || !group.current || !mixerRef.current) return;

        mixerRef.current.update(delta);

        const innerBounds = calculateInnerBounds(fenceBounds);
        const currentPosition = group.current.position;
        const direction = new Vector3().subVectors(targetPosition, currentPosition).normalize();
        const distance = currentPosition.distanceTo(targetPosition);

        console.log(targetPosition);
        // 움직임 업데이트
        // if (distance > DISTANCE_THRESHOLD) {
        //     setAnimation("Run");

        //     // 고정된 속도로 이동
        //     const movement = direction.multiplyScalar(MOVEMENT_SPEED * delta);
        //     const newPosition = currentPosition.clone().add(movement);

        //     // 경계 체크
        //     if (
        //         newPosition.x > innerBounds.min.x &&
        //         newPosition.x < innerBounds.max.x &&
        //         newPosition.z > innerBounds.min.z &&
        //         newPosition.z < innerBounds.max.z
        //     ) {
        //         group.current.position.copy(newPosition);
        //         updateRotation(delta, direction);
        //     } else {
        //         setRandomTarget(innerBounds);
        //     }
        // } else {
        //     // 목표 도달 시 행동
        //     if (!isEating) {
        //         const eatChance = Math.random();
        //         if (eatChance < 0.25) {
        //             setAnimation("Idle_Peck");
        //             setIsEating(true);

        //             const eatDuration = MathUtils.randFloat(2, 5);
        //             eatTimeout = setTimeout(() => {
        //                 setIsEating(false);
        //                 setAnimation("Idle");
        //                 setRandomTarget(innerBounds);
        //             }, eatDuration * 1000);
        //         } else {
        //             setRandomTarget(innerBounds);
        //         }
        //     }
        // }
    });

    return (
        <RigidBody type='kinematic' colliders='ball' lockRotations mass={1} position={position}>
            <group ref={group} dispose={null}>
                <primitive object={clone} />
            </group>
        </RigidBody>
    );
};

useGLTF.preload("./models/minecreft/Chick.glb");
