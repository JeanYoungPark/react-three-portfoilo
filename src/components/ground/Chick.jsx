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
    const rotationRef = useRef(new Quaternion());

    const chick = useGLTF("./models/minecreft/Chick.glb");
    const clone = SkeletonUtils.clone(chick.scene);
    const mixerRef = useRef();

    const { fenceBounds, calculateInnerBounds, targetPosition, setRandomTarget } = useFence({ fenceRef, group });

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

    useFrame((state, delta) => {
        if (!fenceBounds || !group.current) return;

        if (mixerRef.current) {
            mixerRef.current.update(delta);
        }

        const innerBounds = calculateInnerBounds(fenceBounds);
        const currentPosition = group.current.position;

        // Y값을 제외한 방향 계산
        const flatTargetPosition = new Vector3(targetPosition.x, currentPosition.y, targetPosition.z);
        const direction = new Vector3().subVectors(flatTargetPosition, currentPosition).normalize();
        const distance = currentPosition.distanceTo(flatTargetPosition);

        // 움직임 업데이트
        if (distance > 0.2) {
            setAnimation("Run");

            const speed = 2;
            const newX = currentPosition.x + direction.x * delta * speed;
            const newZ = currentPosition.z + direction.z * delta * speed;

            // 경계 체크
            if (newX > fenceBounds.min.x && newX < fenceBounds.max.x && newZ > fenceBounds.min.z && newZ < fenceBounds.max.z) {
                group.current.position.set(newX, currentPosition.y, newZ);

                if (direction.lengthSq() > 0) {
                    const lookDirection = direction.clone().multiplyScalar(-1);
                    const targetRotation = new Quaternion();
                    targetRotation.setFromRotationMatrix(new Matrix4().lookAt(new Vector3(0, 0, 0), lookDirection, new Vector3(0, 1, 0)));

                    // 부드러운 회전 적용
                    rotationRef.current.slerp(targetRotation, 0.1);
                    group.current.quaternion.copy(rotationRef.current);
                }
            } else {
                setRandomTarget(innerBounds);
            }
        } else {
            // 목표 도달 시 행동
            if (!isEating) {
                const eatChance = Math.random();
                if (eatChance < 0.25) {
                    setAnimation("Idle_Peck");
                    setIsEating(true);
                    const eatDuration = MathUtils.randFloat(2, 5);
                    eatTimeout = setTimeout(() => {
                        setIsEating(false);
                        setAnimation("Idle");
                        setRandomTarget(innerBounds);
                    }, eatDuration * 1000);
                } else {
                    setRandomTarget(innerBounds);
                }
            }
        }
    });

    return (
        <RigidBody type='kinematic' colliders='ball' lockRotations mass={1}>
            <group ref={group} dispose={null} position={position}>
                <primitive object={clone} />
            </group>
        </RigidBody>
    );
};

useGLTF.preload("./models/minecreft/Chick.glb");
