import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import { AnimationMixer, Box3, MathUtils, Vector3 } from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

let eatTimeout = null;
const fenceWidth = 0.5;

export const Chickens = ({ fenceRef, position }) => {
    const group = useRef();
    const [animation, setAnimation] = useState("Idle");
    const [targetPosition, setTargetPosition] = useState(null);
    const [isEating, setIsEating] = useState(false);

    const chick = useGLTF("./models/minecreft/Chick.glb");
    const clone = SkeletonUtils.clone(chick.scene);
    const mixerRef = useRef();

    // 울타리 경계 설정
    const [fenceBounds, setFenceBounds] = useState(null);

    // 울타리 내부 경계 계산
    const calculateInnerBounds = (outerBounds) => {
        return new Box3(
            new Vector3(
                MathUtils.randFloat(outerBounds.min.x + fenceWidth, outerBounds.max.x + fenceWidth),
                1,
                MathUtils.randFloat(outerBounds.min.z + fenceWidth, outerBounds.max.z + fenceWidth)
            ),
            new Vector3(outerBounds.max.x - fenceWidth, 1, outerBounds.max.z - fenceWidth)
        );
    };

    // 목표 위치를 랜덤으로 설정
    const setRandomTarget = (innerBounds) => {
        const randomX = MathUtils.randFloat(innerBounds.min.x, innerBounds.max.x);
        const randomZ = MathUtils.randFloat(innerBounds.min.z, innerBounds.max.z);
        setTargetPosition(new Vector3(randomX, 1, randomZ));
    };

    useEffect(() => {
        return () => {
            if (eatTimeout) {
                clearTimeout(eatTimeout);
            }
        };
    }, []);

    useEffect(() => {
        if (fenceRef.current) {
            const box = new Box3().setFromObject(fenceRef.current);
            setFenceBounds(box);
            // 닭의 초기 위치를 울타리 내부로 설정
            const initialX = MathUtils.randFloat(box.min.x + fenceWidth, box.max.x - fenceWidth);
            const initialZ = MathUtils.randFloat(box.min.z + fenceWidth, box.max.z - fenceWidth);
            group.current.position.set(initialX, 1, initialZ);

            const innerBounds = calculateInnerBounds(box);
            setRandomTarget(innerBounds);
        }
    }, [fenceRef]);

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
