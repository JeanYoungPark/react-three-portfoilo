import { useRef } from "react";
import { Vector3 } from "three";
import { CAMERA_POSITIONS } from "../../constants/cameraConstants";
import { useCartStore } from "../../store/cartStore";

export const useSceneTransition = ({ cubeManRef }) => {
    const { setState } = useCartStore();

    const currentSceneIndex = useRef(1);
    const transitionProgress = useRef(0);
    const targetPosition = useRef(new Vector3(...CAMERA_POSITIONS[1].camera));
    const targetLookAt = useRef(new Vector3(...CAMERA_POSITIONS[1].lookAtOffset));

    const cameraMoveByScene = ({ direction }) => {
        const nextIndex = Math.min(Math.max(currentSceneIndex.current + direction, 1), CAMERA_POSITIONS.length - 1);

        if (nextIndex !== currentSceneIndex.current) {
            transitionProgress.current = 0;
            setState(direction > 0 ? "down" : "up");

            const mills = direction ? 3000 : 0;

            setTimeout(() => {
                currentSceneIndex.current = nextIndex;
                targetPosition.current.set(...CAMERA_POSITIONS[nextIndex].camera);
                targetLookAt.current.set(...CAMERA_POSITIONS[nextIndex].lookAtOffset);

                cubeManRef.current.setTranslation(new Vector3(...CAMERA_POSITIONS[nextIndex].cubeMenPos));
            }, mills);
        }
    };

    return { currentSceneIndex, transitionProgress, targetPosition, targetLookAt, cameraMoveByScene };
};
