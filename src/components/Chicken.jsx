import { SpotLight, useAnimations, useGLTF } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { useFence } from "../hook/main/useFence";
import { AnimationMixer, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

let idleTimeout = null;
let idlePeckTimeout = null;
let actions = ["Idle", "Idle_Peck", "Run"];

export const Chicken = ({ fenceRef }) => {
    const group = useRef();
    const [animation, setAnimation] = useState(null);
    const [isActing, setIsActing] = useState({ Idle: false, Idle_Peck: false, Run: false });

    const chicken = useGLTF("./models/minecreft/Chicken.glb");
    const clone = SkeletonUtils.clone(chicken.scene);
    const mixerRef = useRef();
    const { fenceBounds, calculateInnerBounds, targetPosition, setRandomTarget } = useFence({ fenceRef, group });

    useEffect(() => {
        return () => {
            idleTimeout && clearTimeout(idleTimeout);
            idlePeckTimeout && clearTimeout(idlePeckTimeout);
        };
    }, []);

    useEffect(() => {
        // Set up animation
        if (clone && animation) {
            const mixer = new AnimationMixer(clone);

            if (chicken.animations.length > 0) {
                const anim = Object.values(chicken.animations).filter((data) => {
                    return data.name === `AnimalArmature|AnimalArmature|AnimalArmature|${animation}`;
                });

                const action = mixer.clipAction(anim[0]);
                action.play();
            }
            mixerRef.current = mixer;
        }
    }, [clone, animation]);

    const setNewAnim = () => {
        const randomAction = Math.floor(Math.random() * 3);
        setAnimation(actions[randomAction]);
    };

    useFrame((state, delta) => {
        if (!fenceBounds || !group.current) return;

        if (mixerRef.current) {
            mixerRef.current.update(delta);
        }

        const innerBounds = calculateInnerBounds(fenceBounds);
        const randTime = Math.random() * 5 + 2;

        if (animation === "Run") {
            if (isActing["Run"]) {
                const currentPosition = group.current.position;
                const direction = new Vector3().subVectors(targetPosition, currentPosition).normalize();
                const distance = currentPosition.distanceTo(targetPosition);

                // 목표 위치로 이동
                if (distance > 0.1) {
                    const newX = currentPosition.x + direction.x * delta * 1;
                    const newZ = currentPosition.z + direction.z * delta * 1;

                    if (newX > fenceBounds.min.x && newX < fenceBounds.max.x && newZ > fenceBounds.min.z && newZ < fenceBounds.max.z) {
                        group.current.position.set(newX, 1, newZ);
                        group.current.lookAt(targetPosition);
                    } else {
                        // 목적지 도착
                        setAnimation(null);
                        setIsActing((prev) => ({ ...prev, Run: false }));
                    }
                } else {
                    // 목적지 도착
                    setAnimation(null);
                    setIsActing((prev) => ({ ...prev, Run: false }));
                }
            } else {
                setIsActing((prev) => ({ ...prev, Run: true }));
                setRandomTarget(innerBounds); // 경계에 도달하면 새로운 목표 설정
            }
        } else if (animation === "Idle") {
            if (!isActing["Idle"]) {
                setIsActing((prev) => ({ ...prev, Idle: true }));

                idleTimeout = setTimeout(() => {
                    setIsActing((prev) => ({ ...prev, Idle: false }));
                    setAnimation(null);
                }, randTime * 1000);
            }
        } else if (animation === "Idle_Peck") {
            if (!isActing["Idle_Peck"]) {
                setIsActing((prev) => ({ ...prev, Idle_Peck: true }));

                idlePeckTimeout = setTimeout(() => {
                    setIsActing((prev) => ({ ...prev, Idle_Peck: false }));
                    setAnimation(null);
                }, randTime * 1000);
            }
        } else {
            setNewAnim();
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

// useGLTF.preload("./models/pack/Chicken.glb");
useGLTF.preload("./models/pack/Chicken.glb");
