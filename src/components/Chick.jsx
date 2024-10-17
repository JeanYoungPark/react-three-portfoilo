import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import { AnimationMixer, Box3, MathUtils, Vector3 } from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { useFence } from "../hook/main/useFence";

let eatTimeout = null;

export const Chick = ({ fenceRef }) => {
    const group = useRef();
    const [animation, setAnimation] = useState("Idle");
    const [isEating, setIsEating] = useState(false);

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
        // Set up animation
        if (clone) {
            const mixer = new AnimationMixer(clone);
            if (chick.animations.length > 0) {
                const anim = Object.values(chick.animations).filter((data) => {
                    return data.name === `AnimalArmature|AnimalArmature|AnimalArmature|${animation}`;
                });

                const action = mixer.clipAction(anim[0]);
                action.play();
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
        const direction = new Vector3().subVectors(targetPosition, currentPosition).normalize();
        const distance = currentPosition.distanceTo(targetPosition);

        // 목표 위치로 이동
        if (distance > 0.1) {
            setAnimation("Run");
            const newX = currentPosition.x + direction.x * delta * 1;
            const newZ = currentPosition.z + direction.z * delta * 1;

            if (newX > fenceBounds.min.x && newX < fenceBounds.max.x && newZ > fenceBounds.min.z && newZ < fenceBounds.max.z) {
                group.current.position.set(newX, 1, newZ);
                group.current.lookAt(targetPosition);
            } else {
                setRandomTarget(innerBounds); // 경계에 도달하면 새로운 목표 설정
            }
        } else {
            if (!isEating) {
                const eatChange = Math.random();
                if (eatChange < 0.25) {
                    setAnimation("Idle_Peck"); // 대기 애니메이션으로 전환
                    setIsEating(true);

                    const randTime = Math.random() * 5 + 2;
                    // EAT_ANIMATION_TIME 후에 다시 랜덤 목표 설정
                    eatTimeout = setTimeout(() => {
                        setIsEating(false);
                        setRandomTarget(innerBounds); // 다시 랜덤 목표 설정
                    }, randTime * 1000);
                } else {
                    setRandomTarget(innerBounds); // 목표 위치 도달 시 새로운 위치 설정
                }
            }
        }
    });

    return (
        <RigidBody type='fixed' colliders='cuboid' lockRotations mass={1}>
            <group ref={group} dispose={null}>
                <primitive object={clone} />
            </group>
        </RigidBody>
    );
};

useGLTF.preload("./models/minecreft/Chick.glb");
