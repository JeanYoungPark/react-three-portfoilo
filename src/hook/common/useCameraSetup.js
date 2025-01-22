import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { CAMERA_POSITIONS } from "../../constants/cameraConstants";
import { Vector3 } from "three";

export const useCameraSetup = ({ cameraRef, currentLookAtRef }) => {
    const { set, size } = useThree();

    useEffect(() => {
        if (!cameraRef.current) return;

        // 카메라를 기본 카메라로 설정
        cameraRef.current.aspect = size.width / size.height;
        cameraRef.current.updateProjectionMatrix();

        // 초기 위치 설정
        cameraRef.current.position.set(...CAMERA_POSITIONS[0].camera);

        const initialLookAt = new Vector3().addVectors(cameraRef.current.position, new Vector3(...CAMERA_POSITIONS[0].lookAtOffset));
        currentLookAtRef.current.copy(initialLookAt);
        cameraRef.current.lookAt(initialLookAt);

        set({ camera: cameraRef.current });
    }, [set, size]);
};
