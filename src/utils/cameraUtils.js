import { Vector3 } from "three";
import { CAMERA_LOOK_AT_COLLISION_POSITIONS, CAMERA_POSITIONS, SCENE_BOUNDARIES } from "../constants/cameraConstants";

export const checkCubeManIsFalling = ({ cubeManRef, currentSceneIndex }) => {
    if (!cubeManRef.current) return;

    const position = cubeManRef.current.translation();
    const sceneIndex = currentSceneIndex.current;

    // 현재 scene의 boundary 가져오기
    const boundaries = SCENE_BOUNDARIES[sceneIndex];

    // 현재 position.y가 boundary를 벗어났는지 확인
    if (position.y < boundaries.minY || position.y > boundaries.maxY) {
        const resetPosition = new Vector3(...CAMERA_POSITIONS[sceneIndex].cubeMenPos);
        cubeManRef.current.setTranslation(resetPosition);
    }
};
