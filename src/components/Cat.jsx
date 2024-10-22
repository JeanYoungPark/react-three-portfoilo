import { useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import React, { useEffect, useRef, useState } from "react";
import { degToRad } from "three/src/math/MathUtils";

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
    const WALK_SPEED = 0.8;
    const RUN_SPEED = 1.6;
    const rb = useRef();
    const group = useRef();
    const rotationTarget = useRef(0);
    const characterRotationTarget = useRef(0);
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Cat.glb");
    const { actions } = useAnimations(animations, group);
    const [anim, setAnim] = useState("Idle");
    const [, get] = useKeyboardControls();

    useEffect(() => {
        if (anim) {
            actions[`AnimalArmature|AnimalArmature|AnimalArmature|${anim}`].play();

            // return () => {
            //     actions[`AnimalArmature|AnimalArmature|AnimalArmature|${anim}`].stop();
            // };
        }
    }, [actions, anim]);

    useFrame(() => {
        if (rb.current) {
            const vel = rb.current.linvel();

            const movement = {
                x: 0,
                z: 0,
            };

            // 키보드 입력에 따른 움직임 설정
            if (get().forward) movement.z = 1;
            if (get().backward) movement.z = -1;
            if (get().left) movement.x = -1;
            if (get().right) movement.x = 1;

            let speed = get().run ? RUN_SPEED : WALK_SPEED;

            if (movement.x !== 0 || movement.z !== 0) {
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

            rb.current.setLinvel(vel, true);
            group.current.rotation.y = lerpAngle(group.current.rotation.y, characterRotationTarget.current, 0.1);
        }
    });

    return (
        <RigidBody colliders={false} lockRotations ref={rb} type='dynamic' position={[18, 1.7, 4]}>
            <group ref={group}>
                <primitive object={nodes.AnimalArmature} />
                <skinnedMesh name='Ch14' geometry={nodes.Cat.geometry} material={materials.AtlasMaterial} skeleton={nodes.Cat.skeleton} />
            </group>
            <CapsuleCollider args={[0.08, 0.15]} />
        </RigidBody>
    );
};
