import { useRef, useState } from "react";
import { lerpAngle } from "../../utils/angleUtils";
import { useKeyboardControls } from "@react-three/drei";
import { useChestStore } from "../../store/chestStore";
import { useCollisionObjStore } from "../../store/collisionObjStore";
import { useSheepBubbleStore } from "../../store/sheepBubbleStore";

const WALK_SPEED = 3.5;
const RUN_SPEED = 5.5;

export const useCharacterMovement = (rb, world, group, setAnim) => {
    const { toggleChest } = useChestStore();
    const { setText } = useSheepBubbleStore();
    const { ob: collisionOb, setOb, clearOb } = useCollisionObjStore();

    const isJumping = useRef(false);
    const rotationTarget = useRef(0);
    const characterRotationTarget = useRef(0);
    const [spacePressed, setSpacePressed] = useState(false);
    const [, get] = useKeyboardControls();

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

    const handleCollisionEnter = (target) => {
        if (target.rigidBodyObject?.name) {
            setOb(target.rigidBodyObject);
        }
    };

    const handleCollisionExit = () => {
        clearOb();
    };

    const handleMovement = () => {
        if (!rb.current) return;

        const controls = get();
        const vel = rb.current.linvel();
        const movement = { x: 0, z: 0 };

        if (controls.forward) movement.z = -1;
        if (controls.backward) movement.z = 1;
        if (controls.left) movement.x = -1;
        if (controls.right) movement.x = 1;

        if (controls.space && !isJumping.current && !collisionOb?.name) {
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

    const handleCollisions = () => {
        if (get().space) {
            if (!spacePressed) {
                setSpacePressed(true);

                if (collisionOb?.name === "chest") {
                    toggleChest();
                } else if (collisionOb?.name === "sheep") {
                    setText("hello!\r");
                }
            }
        } else {
            setSpacePressed(false);
        }
    };

    return { isJumping, checkGroundCollision, handleMovement, handleCollisionEnter, handleCollisionExit, handleCollisions };
};
