import { useContext, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useCartStore } from "../store/cartStore";
import { useBubbleStore } from "../store/bubbleStore";
import { CubeManContext } from "../pages/Main";
import { CAMERA_POSITIONS } from "../constants/cameraConstants";
import { useSceneTransition } from "../hook/common/useSceneTransition";
import { checkCubeManIsFalling } from "../utils/cameraUtils";
import { useCameraMovement } from "../hook/common/useCameraMovement";

export const CameraController = () => {
    const { cubeManRef } = useContext(CubeManContext);
    const { state: cartState } = useCartStore();
    const { isTalking } = useBubbleStore();

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
    }, [setInitCameraState]);

    const handleScroll = (event) => {
        event.preventDefault();

        if (cartState === "done" && !isTalking) {
            const direction = event.deltaY > 0 ? 1 : -1;
            handleSceneTransition({ direction });
        }
    };

    useEffect(() => {
        window.addEventListener("wheel", handleScroll, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);

    useFrame((state, delta) => {
        if (!cubeManRef.current) return;

        checkCubeManIsFalling({ cubeManRef, currentSceneIndex });

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
