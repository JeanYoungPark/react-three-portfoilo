import { Vector3 } from "three";

// 장면에 따른 카메라 포지션 설정
export const CAMERA_POSITIONS: {
    camera: [number, number, number];
    lookAtOffset: [number, number, number];
}[] = [
    { camera: [20, 50, 23], lookAtOffset: [-10, -10, -23] },
    { camera: [20, 10, 23], lookAtOffset: [-10, -10, -23] },
    { camera: [30, -4, 52], lookAtOffset: [-20, -15, -20] },
    { camera: [50, -20, 62], lookAtOffset: [0, -10, -20] },
];

// 장면에 따른 캐릭터 위치 설정
export const CUBE_MEN_POSITIONS: { position: Vector3; rotation: Vector3 }[] = [
    { position: new Vector3(18, 10, 6), rotation: new Vector3(0, 0, 0) },
    { position: new Vector3(12, -5, 36), rotation: new Vector3(0, 0, 0) },
    { position: new Vector3(50, -25, 42), rotation: new Vector3(0, 0, 0) },
];

// 물리적 충돌객체에 따른 카메라 위치 설정
export const CAMERA_LOOK_AT_COLLISION_POSITIONS: Record<string, { camera: Vector3; lookAtOffset: Vector3 }> = {
    sheep: { camera: new Vector3(18.5, 7, 6), lookAtOffset: new Vector3(2, -2, -2) },
    dog: { camera: new Vector3(12, -13, 40), lookAtOffset: new Vector3(-2, -2, 2) },
    horse: { camera: new Vector3(22, -12, 35), lookAtOffset: new Vector3(-2, -2, -2) },
    pig: { camera: new Vector3(24, -12, 35), lookAtOffset: new Vector3(-2, -2, -2) },
    yeti: { camera: new Vector3(45, -30, 45), lookAtOffset: new Vector3(-2, -2, -2) },
    wolf: { camera: new Vector3(51, -32, 45), lookAtOffset: new Vector3(2, -2, 2) },
};

export const SCENE_BOUNDARIES = {
    1: { minY: -10, maxY: Infinity },
    2: { minY: -30, maxY: 2 },
    3: { minY: -50, maxY: -24 },
};

// 후크의 법칙과 비슷한 원리, 가속과 감속
export const SPRING_STRENGTH = 0.03;

// 자연스러운 움직임
export const DAMPING = 0.92;

// 카메라 이동 전 스탠바이 타임
export const STAND_BY_CAMERA_TIME_MILLS = 3000;
