import { useThree } from "@react-three/fiber";
import { RefObject, useCallback, useRef } from "react";
import { PerspectiveCamera, Vector3 } from "three";
import { CAMERA_LOOK_AT_COLLISION_POSITIONS, CAMERA_POSITIONS, DAMPING, SPRING_STRENGTH } from "../../constants/cameraConstants";
import { RapierRigidBody } from "@react-three/rapier";
import { useCollisionObjStore } from "../../store/collisionObjStore";
import { useCartStore } from "../../store/cartStore";

interface InitCameraStateProps {
    position: Vector3;
    lookAt: Vector3;
}

interface UpdateCameraPositionForCollisionProps {
    delta: number;
}

interface updateCameraPositionForScrollingProps {
    targetPosition: RefObject<Vector3>;
    targetLookAt: RefObject<Vector3>;
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

    const setInitCameraState = ({ position, lookAt }: InitCameraStateProps) => {
        if (!cameraRef?.current || !currentLookAtRef.current) return;

        // 카메라를 기본 카메라로 설정
        cameraRef.current.aspect = size.width / size.height;
        cameraRef.current.updateProjectionMatrix();

        // 초기 위치 설정
        cameraRef.current.position.copy(position);

        // 새로운 벡터를 생성하고 두 벡터의 합을 저장
        const initialLookAt = new Vector3().addVectors(cameraRef.current.position, lookAt);
        currentLookAtRef.current.copy(initialLookAt);
        cameraRef.current.lookAt(initialLookAt);

        set({ camera: cameraRef.current });
    };

    const updateCameraPositionForCollision = ({ delta }: UpdateCameraPositionForCollisionProps) => {
        if (!CAMERA_LOOK_AT_COLLISION_POSITIONS[collisionOb?.name]) return;
        if (!cameraRef?.current || !currentLookAtRef?.current) return;

        // Update camera position
        const targetPos = CAMERA_LOOK_AT_COLLISION_POSITIONS[collisionOb.name].camera;
        const diffVec = targetPos.clone().sub(cameraRef.current.position).multiplyScalar(delta);
        cameraRef.current.position.add(diffVec);

        // Update look-at with currentLookAtRef
        const lookAtOffset = CAMERA_LOOK_AT_COLLISION_POSITIONS[collisionOb.name].lookAtOffset;
        // 기존 백터를 복사하고 다른 벡터를 더함
        const targetLookAt = targetPos.clone().add(lookAtOffset);
        currentLookAtRef.current.lerp(targetLookAt, delta);
        cameraRef.current.lookAt(currentLookAtRef.current);
    };

    const updateCameraPositionForScrolling = ({ targetPosition, targetLookAt }: updateCameraPositionForScrollingProps) => {
        if (!cameraRef?.current || !currentLookAtRef?.current || !targetPosition?.current || !targetLookAt?.current) return;

        const diff = targetPosition.current.clone().sub(cameraRef.current.position);
        velocity.current.copy(diff.multiplyScalar(SPRING_STRENGTH));
        velocity.current.multiplyScalar(DAMPING);
        cameraRef.current.position.add(velocity.current);

        // LookAt 업데이트
        const targetLookAtPos = cameraRef.current.position.clone().add(targetLookAt.current);
        currentLookAtRef.current.lerp(targetLookAtPos, 0.1);
        cameraRef.current.lookAt(currentLookAtRef.current);
    };

    return { setInitCameraState, updateCameraPositionForCollision, updateCameraPositionForScrolling };
};
