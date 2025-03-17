import { useThree } from "@react-three/fiber";
import { RefObject, useRef } from "react";
import { PerspectiveCamera, Vector3 } from "three";
import { CAMERA_LOOK_AT_COLLISION_POSITIONS, CAMERA_POSITIONS, DAMPING, SPRING_STRENGTH } from "../../constants/cameraConstants";
import { useCollisionObjStore } from "../../store/collisionObjStore";

interface UpdateCameraPositionForCollisionProps {
    delta: number;
}
interface updateCameraPositionForScrollingProps {
    targetPosition: RefObject<Vector3>;
    targetLookAt: RefObject<Vector3>;
    delta: number;
}
interface Props {
    cameraRef: RefObject<PerspectiveCamera>;
    currentLookAtRef: RefObject<Vector3>;
}

// Todo: currentLookAt 필요없다면 제거
export const useCameraMovement = ({ cameraRef, currentLookAtRef }: Props) => {
    const { set, size } = useThree();
    const { ob: collisionOb } = useCollisionObjStore();
    const velocity = useRef(new Vector3(0, 0, 0));

    const setInitCameraState = () => {
        if (!cameraRef?.current || !currentLookAtRef.current) return;
        // 카메라를 기본 카메라로 설정
        cameraRef.current.aspect = size.width / size.height;
        cameraRef.current.updateProjectionMatrix();

        // 초기 위치 설정
        cameraRef.current.position.copy(CAMERA_POSITIONS[0].camera);

        // 새로운 벡터를 생성하고 두 벡터의 합을 저장
        const initialLookAt = new Vector3().addVectors(cameraRef.current.position, CAMERA_POSITIONS[0].lookAtOffset);
        currentLookAtRef.current.copy(initialLookAt);
        cameraRef.current.lookAt(initialLookAt);

        set({ camera: cameraRef.current });
    };

    const updateCameraPositionForCollision = ({ delta }: UpdateCameraPositionForCollisionProps) => {
        // 충돌 객체는 전역으로 관리
        if (!CAMERA_LOOK_AT_COLLISION_POSITIONS[collisionOb?.name]) return;
        if (!cameraRef?.current || !currentLookAtRef?.current) return;

        // Update camera position
        const targetPos = CAMERA_LOOK_AT_COLLISION_POSITIONS[collisionOb.name].camera;
        const diffVec = targetPos.clone().sub(cameraRef.current.position).multiplyScalar(delta);
        cameraRef.current.position.add(diffVec);

        // Update look-at with currentLookAtRef
        const lookAtOffset = CAMERA_LOOK_AT_COLLISION_POSITIONS[collisionOb.name].lookAtOffset;
        const targetLookAtPos = cameraRef.current.position.clone().add(lookAtOffset);
        const currentLookAt = new Vector3();
        cameraRef.current.getWorldDirection(currentLookAt);

        const direction = targetLookAtPos.clone().sub(cameraRef.current.position.clone()).normalize();
        currentLookAt.add(direction.multiplyScalar(delta));
        cameraRef.current.lookAt(cameraRef.current.position.clone().add(currentLookAt));
    };

    const updateCameraPositionForScrolling = ({ targetPosition, targetLookAt, delta }: updateCameraPositionForScrollingProps) => {
        if (!cameraRef?.current || !currentLookAtRef?.current || !targetPosition?.current || !targetLookAt?.current) return;

        const diff = targetPosition.current.clone().sub(cameraRef.current.position);
        velocity.current.copy(diff.multiplyScalar(SPRING_STRENGTH));
        velocity.current.multiplyScalar(DAMPING);
        cameraRef.current.position.add(velocity.current);

        // LookAt 업데이트
        const targetLookAtPos = cameraRef.current.position.clone().add(targetLookAt.current);
        const currentLookAt = new Vector3();
        cameraRef.current.getWorldDirection(currentLookAt);

        const direction = targetLookAtPos.clone().sub(cameraRef.current.position.clone()).normalize();
        currentLookAt.add(direction.multiplyScalar(delta));
        cameraRef.current.lookAt(cameraRef.current.position.clone().add(currentLookAt));
    };

    return { setInitCameraState, updateCameraPositionForCollision, updateCameraPositionForScrolling };
};
