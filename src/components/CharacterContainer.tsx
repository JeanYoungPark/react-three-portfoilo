import React, { useRef, useState } from "react";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { Camera } from "three";
import { useFrame } from "@react-three/fiber";
import { Character } from "./Character";

export const CharacterContainer = () => {
    const rb = useRef<any>(null);
    const container = useRef<any>(null);
    const cameraTarget = useRef<any>(null);
    const cameraPosition = useRef<any>(null);
    const character = useRef<any>(null);

    const [animation, setAnimation] = useState("Idle");

    useFrame(({ camera, mouse }: { camera: Camera; mouse: { x: number; y: number } }) => {
        if (rb.current) {
            // rb.current에 대한 로직 처리
            console.log("Camera:", camera);
            console.log("Mouse Position:", mouse);
        }
    });

    return (
        <RigidBody colliders={false} lockRotations ref={rb}>
            <group ref={container} position={[40, 13, 2]} rotation={[0, Math.PI / 2, 0]}>
                <group ref={cameraTarget} position-z={1.5} />
                <group ref={cameraPosition} position-y={4} position-z={-4} />
                <group ref={character}>
                    <Character scale={0.18} position-y={-0.25} animation={animation} />
                </group>
            </group>
            <CapsuleCollider args={[0.08, 0.15]} />
        </RigidBody>
    );
};
