import { useThree } from "@react-three/fiber";
import { RefObject, useCallback } from "react";
import { PerspectiveCamera, Vector3 } from "three";

interface InitCameraStateProps {
    position: Vector3;
    lookAt: Vector3;
}

interface Props {
    cameraRef: RefObject<PerspectiveCamera>;
    currentLookAtRef: RefObject<Vector3>;
}
// Todo: currentLookAt 필요없다면 제거
export const useCameraMovement = ({ cameraRef, currentLookAtRef }: Props) => {
    // if (!cameraRef || !("current" in cameraRef) || !cameraRef.current) {
    //     throw new Error("Invalid cameraRef: Camera reference is null or undefined.");
    // }

    // if (!currentLookAtRef || !("current" in currentLookAtRef) || !currentLookAtRef.current) {
    //     throw new Error("Invalid currentLookAtRef: Camera reference is null or undefined.");
    // }

    // const cameraRef = useRef<PerspectiveCamera>(null);
    // const currentLookAt = useRef(new Vector3());

    const { set, size } = useThree();

    const setInitCameraState = useCallback(
        ({ position, lookAt }: InitCameraStateProps) => {
            console.log(position);
            if (!cameraRef?.current) return;

            // 카메라를 기본 카메라로 설정
            cameraRef.current.aspect = size.width / size.height;
            cameraRef.current.updateProjectionMatrix();

            // 초기 위치 설정
            cameraRef.current.position.copy(position);

            const initialLookAt = new Vector3().addVectors(cameraRef.current.position, lookAt);
            currentLookAtRef.current!.copy(initialLookAt);
            cameraRef.current.lookAt(initialLookAt);
        },
        [cameraRef.current]
    );

    // const updateCameraPosition = (delta) => {};

    return { setInitCameraState };
};
