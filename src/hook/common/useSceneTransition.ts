import { RefObject, useRef } from "react";
import { Vector3 } from "three";
import { CAMERA_POSITIONS, CUBE_MEN_POSITIONS, STAND_BY_CAMERA_TIME_MILLS } from "../../constants/cameraConstants";
import { useCartStore } from "../../store/cartStore";
import { RapierRigidBody } from "@react-three/rapier";

interface Props {
    cubeManRef: RefObject<RapierRigidBody>;
}
export const useSceneTransition = ({ cubeManRef }: Props) => {
    const { setState } = useCartStore();

    const currentSceneIndex = useRef(1);
    const transitionProgress = useRef(0);
    const targetPosition = useRef(new Vector3(...CAMERA_POSITIONS[1].camera));
    const targetLookAt = useRef(new Vector3(...CAMERA_POSITIONS[1].lookAtOffset));

    // 메인 함수 이름을 목적에 맞게 변경
    const handleSceneTransition = ({ direction }: { direction: number }) => {
        const nextIndex = calculateNextSceneIndex(direction);

        if (nextIndex !== currentSceneIndex.current) {
            initializeTransition(direction);
            schedulePositionUpdates({ direction, nextIndex });
        }
    };

    // 다음 씬 인덱스 계산
    const calculateNextSceneIndex = (direction: number) => {
        return Math.min(Math.max(currentSceneIndex.current + direction, 1), CAMERA_POSITIONS.length - 1);
    };

    // 전환 상태 초기화
    const initializeTransition = (direction: number) => {
        transitionProgress.current = 0;
        setState(direction > 0 ? "down" : "up");
    };

    // 위치 업데이트 스케줄링
    const schedulePositionUpdates = ({ direction, nextIndex }: { direction: number; nextIndex: number }) => {
        const mills = direction ? STAND_BY_CAMERA_TIME_MILLS : 0;

        setTimeout(() => {
            updatePositions(nextIndex);
        }, mills);
    };

    // 실제 위치 업데이트
    const updatePositions = (nextIndex: number) => {
        currentSceneIndex.current = nextIndex;
        updateCameraPosition(nextIndex);
        updateCharacterPosition(nextIndex);
    };

    // 카메라 목표 위치 업데이트
    const updateCameraPosition = (nextIndex: number) => {
        targetPosition.current.set(...CAMERA_POSITIONS[nextIndex].camera);
        targetLookAt.current.set(...CAMERA_POSITIONS[nextIndex].lookAtOffset);
    };

    // 캐릭터 위치 업데이트
    const updateCharacterPosition = (nextIndex: number) => {
        if (!cubeManRef?.current) return;

        cubeManRef.current.setTranslation(CUBE_MEN_POSITIONS[nextIndex - 1].position, true);
    };

    return { currentSceneIndex, transitionProgress, targetPosition, targetLookAt, handleSceneTransition };
};
