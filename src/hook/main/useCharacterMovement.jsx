import { useRef } from "react";
import { lerpAngle } from "../../utils/angleUtils";
import { useAnimations, useKeyboardControls } from "@react-three/drei";
import { useCollisionObjStore } from "../../store/collisionObjStore";
import { useBubbleStore } from "../../store/bubbleStore";
import { useCharacterAnimation } from "./useCharacterAnimation";

const WALK_SPEED = 3.5;
const RUN_SPEED = 5.5;

export const useCharacterMovement = (rb, world, group, animations) => {
    const { actions, mixer } = useAnimations(animations, group);
    const { anim, setAnim } = useCharacterAnimation(actions, mixer);

    const { setIsTalking } = useBubbleStore();
    const { ob: collisionOb, setOb, clearOb } = useCollisionObjStore();
    const { text } = useBubbleStore();

    const isJumping = useRef(false);
    const rotationTarget = useRef(0);
    const characterRotationTarget = useRef(0);
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

    const handleCollisionExit = (target) => {
        if (target.rigidBodyObject?.name) {
            clearOb();
            setIsTalking({ text: "", isTalking: false });
        }
    };

    const handleMovement = () => {
        if (!rb.current) return;
        if (collisionOb && text) {
            setAnim("Idle");
            return;
        }

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

        const speed = controls.run ? RUN_SPEED : WALK_SPEED;

        if (movement.x !== 0 || movement.z !== 0) {
            characterRotationTarget.current = Math.atan2(movement.x, movement.z);
            vel.x = Math.sin(rotationTarget.current + characterRotationTarget.current) * speed;
            vel.z = Math.cos(rotationTarget.current + characterRotationTarget.current) * speed;

            setAnim(speed === RUN_SPEED ? "Run" : "Walk");
        } else {
            vel.x = 0;
            vel.z = 0;
        }

        rb.current.setLinvel(vel, true);
        group.current.rotation.y = lerpAngle(group.current.rotation.y, characterRotationTarget.current, 0.1);
    };

    const handleKeyDown = (e) => {
        if (e.key === "q") {
            setAnim("No");
        } else if (e.key === "w") {
            setAnim("Yes");
        } else if (e.key === "e") {
            setAnim("Punch");
        } else if (e.key === "r") {
            setAnim("Wave");
        }
    };

    const handleKeyUp = (e) => {
        if (anim === "Walk" || anim === "Run") {
            setAnim("Idle");
        }
    };

    return { isJumping, checkGroundCollision, handleMovement, handleCollisionEnter, handleCollisionExit, handleKeyDown, handleKeyUp };
};
