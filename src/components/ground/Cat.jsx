import { useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";

const normalizeAngle = (angle) => {
    while (angle > Math.PI) angle -= 2 * Math.PI;
    while (angle < -Math.PI) angle += 2 * Math.PI;
    return angle;
};

const lerpAngle = (start, end, t) => {
    start = normalizeAngle(start);
    end = normalizeAngle(end);

    if (Math.abs(end - start) > Math.PI) {
        if (end > start) {
            start += 2 * Math.PI;
        } else {
            end += 2 * Math.PI;
        }
    }

    return normalizeAngle(start + (end - start) * t);
};

export const Cat = () => {
    const WALK_SPEED = 2;
    const RUN_SPEED = 2.6;
    const rb = useRef();
    const group = useRef();
    const rotationTarget = useRef(0);
    const characterRotationTarget = useRef(0);
    const isJumping = useRef(false);
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Cat.glb");
    const { actions, mixer } = useAnimations(animations, group);
    const [anim, setAnim] = useState("Jump_Loop");
    const [, get] = useKeyboardControls();
    console.log(actions);
    useEffect(() => {
        if (anim && actions) {
            Object.values(actions).forEach((action) => action.stop());
            const currentAction = actions[`AnimalArmature|AnimalArmature|AnimalArmature|${anim}`];
            if (currentAction) {
                currentAction.fadeIn(0.2).play();
                console.log(anim);
                // Jump_Start 애니메이션이 끝나면 Jump_Loop로 전환
                if (anim === "Jump_Start") {
                    currentAction.setLoop(false);
                    currentAction.clampWhenFinished = true;
                    currentAction.repetitions = 1;

                    const onFinish = () => {
                        setAnim("Jump_Loop");
                        mixer.removeEventListener("finished", onFinish);
                    };

                    mixer.addEventListener("finished", onFinish);
                }
            }
            // Cleanup 함수로 애니메이션 정리
            return () => {
                if (currentAction) {
                    currentAction.stop();
                }
            };
        }
    }, [actions, anim]);

    useFrame(() => {
        if (rb.current) {
            const vel = rb.current.linvel();
            const movement = {
                x: 0,
                z: 0,
            };

            const isGrounded = Math.abs(vel.y) < 0.1;

            // 지면에 착지했을 때 점프 상태 해제
            if (isGrounded && isJumping.current) {
                isJumping.current = false;
                setAnim("Idle");
            }

            // 키보드 입력에 따른 움직임 설정
            if (get().forward) movement.z = -1;
            if (get().backward) movement.z = 1;
            if (get().left) movement.x = -1;
            if (get().right) movement.x = 1;

            if (get().jump && isGrounded && !isJumping.current) {
                isJumping.current = true;
                vel.y = 5;
                setAnim("Jump_Start");
            }
            // console.log(isJumping.current);
            if (!isJumping.current) {
                let speed = get().run ? RUN_SPEED : WALK_SPEED;

                if (movement.x !== 0 || movement.z !== 0) {
                    // 방향에 따른 회전 값
                    characterRotationTarget.current = Math.atan2(movement.x, movement.z);
                    vel.x = Math.sin(rotationTarget.current + characterRotationTarget.current) * speed;
                    vel.z = Math.cos(rotationTarget.current + characterRotationTarget.current) * speed;

                    if (speed === RUN_SPEED) {
                        setAnim("Run");
                    } else {
                        setAnim("Walk");
                    }
                } else {
                    setAnim("Idle");
                }
            }

            rb.current.setLinvel(vel, true);
            group.current.rotation.y = lerpAngle(group.current.rotation.y, characterRotationTarget.current, 0.1);
        }
    });

    return (
        <RigidBody ref={rb} type='dynamic' colliders='cuboid' position={[18, 1, 4]} lockRotations mess={1}>
            <group ref={group}>
                <primitive object={nodes.AnimalArmature} />
                <skinnedMesh name='Ch14' geometry={nodes.Cat.geometry} material={materials.AtlasMaterial} skeleton={nodes.Cat.skeleton} />
            </group>
            <CapsuleCollider args={[0.25, 0.3]} position={[0, 0.5, 0]} />
        </RigidBody>
    );
};
