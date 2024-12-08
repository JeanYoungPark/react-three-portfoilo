import { useEffect, useRef, useState } from "react";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { useFence } from "./useFence";
import { useGLTF } from "@react-three/drei";
import { AnimationMixer, Matrix4, Quaternion, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

let idleTimeout = null;
let idlePeckTimeout = null;
let actions = ["Idle", "Idle_Peck", "Run"];

export const useAnimFrame = ({ url, fenceRef, group }) => {
    const animal = useGLTF(url);
    const clone = SkeletonUtils.clone(animal.scene);

    const [animation, setAnimation] = useState(null);
    const [isActing, setIsActing] = useState({ Idle: false, Idle_Peck: false, Run: false });
    const { fenceBounds, calculateInnerBounds, targetPosition, setRandomTarget } = useFence({ fenceRef, group });

    const mixerRef = useRef();
    const rotationRef = useRef(new Quaternion());

    const setNewAnim = () => {
        const randomAction = Math.floor(Math.random() * 3);
        setAnimation(actions[randomAction]);
    };

    useEffect(() => {
        if (clone) {
            const mixer = new AnimationMixer(clone);
            if (animal.animations.length > 0) {
                const anim = animal.animations.find((data) => data.name === `AnimalArmature|AnimalArmature|AnimalArmature|${animation}`);
                if (anim) {
                    // 이전 애니메이션 정리
                    mixer.stopAllAction();
                    const action = mixer.clipAction(anim);
                    action.reset().fadeIn(0.2).play();
                }
            }
            mixerRef.current = mixer;
        }
    }, [clone, animation, animal.animations]);

    useEffect(() => {
        return () => {
            idleTimeout && clearTimeout(idleTimeout);
            idlePeckTimeout && clearTimeout(idlePeckTimeout);
        };
    }, []);

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
                const flatTargetPosition = new Vector3(targetPosition.x, currentPosition.y, targetPosition.z);
                const direction = new Vector3().subVectors(flatTargetPosition, currentPosition).normalize();
                const distance = currentPosition.distanceTo(flatTargetPosition);

                // 목표 위치로 이동
                if (distance > 0.1) {
                    const speed = 2;
                    const newX = currentPosition.x + direction.x * delta * speed;
                    const newZ = currentPosition.z + direction.z * delta * speed;

                    if (newX > fenceBounds.min.x && newX < fenceBounds.max.x && newZ > fenceBounds.min.z && newZ < fenceBounds.max.z) {
                        group.current.position.set(newX, 1, newZ);

                        if (direction.lengthSq() > 0) {
                            const lookDirection = direction.clone().multiplyScalar(-1);
                            const targetRotation = new Quaternion();
                            targetRotation.setFromRotationMatrix(new Matrix4().lookAt(new Vector3(0, 0, 0), lookDirection, new Vector3(0, 1, 0)));

                            // 부드러운 회전 적용
                            rotationRef.current.slerp(targetRotation, 0.1);
                            group.current.quaternion.copy(rotationRef.current);
                        }
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

    return { clone };
};
