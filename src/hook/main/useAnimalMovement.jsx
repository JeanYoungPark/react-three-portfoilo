import { useRef } from "react";
import { lerpAngle } from "../../utils/angleUtils";

const WALK_SPEED = 3.5;
const RUN_SPEED = 5.5;

export const useAnimalMovement = (rb, world, group, setAnim) => {
    const isJumping = useRef(false);
    const rotationTarget = useRef(0);
    const characterRotationTarget = useRef(0);

    const checkGroundCollision = () => {
        if (!rb.current || !world) return;

        const rayOrigin = { ...rb.current.translation() };
        rayOrigin.y -= 0.1;
        const rayDirection = { x: 0, y: -1, z: 0 };

        const hit = world.castRay({ origin: rayOrigin, dir: rayDirection }, 0.2, true);

        if (hit && hit.collider) {
            isJumping.current = false;
            setAnim("Idle");
        }
    };

    const handleMovement = (controls) => {
        if (!rb.current) return;

        const vel = rb.current.linvel();
        const movement = { x: 0, z: 0 };

        if (controls.forward) movement.z = -1;
        if (controls.backward) movement.z = 1;
        if (controls.left) movement.x = -1;
        if (controls.right) movement.x = 1;

        if (controls.jump && !isJumping.current) {
            isJumping.current = true;
            vel.y = 5;
            setAnim("Jump_Loop");
        }

        if (!isJumping.current) {
            const speed = controls.run ? RUN_SPEED : WALK_SPEED;

            if (movement.x !== 0 || movement.z !== 0) {
                characterRotationTarget.current = Math.atan2(movement.x, movement.z);
                vel.x = Math.sin(rotationTarget.current + characterRotationTarget.current) * speed;
                vel.z = Math.cos(rotationTarget.current + characterRotationTarget.current) * speed;

                setAnim(speed === RUN_SPEED ? "Run" : "Walk");
            } else {
                vel.x = 0;
                vel.z = 0;
                setAnim("Idle");
            }
        }

        rb.current.setLinvel(vel, true);
        group.current.rotation.y = lerpAngle(group.current.rotation.y, characterRotationTarget.current, 0.1);
    };

    return { isJumping, checkGroundCollision, handleMovement };
};
