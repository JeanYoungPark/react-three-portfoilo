import { useContext, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useCartStore } from "../store/cartStore";
import { useBubbleStore } from "../store/bubbleStore";
import { CubeManContext } from "../pages/Main";
import { CAMERA_LOOK_AT_COLLISION_POSITIONS, CAMERA_POSITIONS, DAMPING, SPRING_STRENGTH } from "../constants/cameraConstants";
import { useSceneTransition } from "../hook/common/useSceneTransition";
import { checkCubeManIsFalling } from "../utils/cameraUtils";
import { useCameraMovement } from "../hook/common/useCameraMovement";
import { useCollisionObjStore } from "../store/collisionObjStore";

export const CameraController = () => {
    const { cubeManRef } = useContext(CubeManContext);
    const { state: cartState } = useCartStore();
    const { isTalking } = useBubbleStore();
    const { ob: collisionOb } = useCollisionObjStore();

    const cameraRef = useRef(null);
    const currentLookAtRef = useRef(new Vector3());
    const { size } = useThree();

    const { currentSceneIndex, transitionProgress, targetPosition, targetLookAt, handleSceneTransition } = useSceneTransition({ cubeManRef });
    const { setInitCameraState, updateCameraPositionForCollision, updateCameraPositionForScrolling } = useCameraMovement({
        cameraRef,
        currentLookAtRef,
    });

    useEffect(() => {
        setInitCameraState();
    }, []);

    useEffect(() => {
        const handleScroll = (event) => {
            event.preventDefault();
            // 카트 움직임이 없고, bubble이 띄어져있는 충돌 객체가 없는 경우 (text로 판단)
            if (cartState === "done" && !isTalking) {
                const direction = event.deltaY > 0 ? 1 : -1;
                handleSceneTransition({ direction });
            }
        };

        window.addEventListener("wheel", handleScroll, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, [cartState, isTalking]);

    useFrame((state, delta) => {
        if (!cubeManRef.current) return;

        checkCubeManIsFalling({ cubeManRef, currentSceneIndex });

        // bubble이 띄어져 있다면
        if (isTalking) {
            updateCameraPositionForCollision({ delta });
        } else {
            updateCameraPositionForScrolling({ targetPosition, targetLookAt, delta });

            if (cartState !== "done") {
                transitionProgress.current += delta * 0.5; // 전환 속도 조절
                if (transitionProgress.current >= 1) {
                    transitionProgress.current = 1;
                }
            }
        }
    });

    return (
        <perspectiveCamera ref={cameraRef} position={CAMERA_POSITIONS[0].camera} aspect={size.width / size.height} near={0.1} far={1000} fov={75} />
    );
};
