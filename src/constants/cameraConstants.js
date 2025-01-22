import { Vector3 } from "three";

export const CAMERA_POSITIONS = [
    { camera: [20, 50, 23], lookAtOffset: [-10, -10, -23] },
    { camera: [20, 10, 23], lookAtOffset: [-10, -10, -23], cubeMenPos: [18, 10, 6] },
    { camera: [30, -4, 52], lookAtOffset: [-20, -15, -20], cubeMenPos: [12, -5, 36] },
    { camera: [50, -20, 62], lookAtOffset: [0, -10, -20], cubeMenPos: [50, -25, 42] },
];

export const CAMERA_POSITIONS_ = [
    { camera: [20, 50, 23], lookAtOffset: [-10, -10, -23] },
    { camera: [20, 10, 23], lookAtOffset: [-10, -10, -23], cubeMenPos: [18, 10, 6] },
    { camera: [30, -4, 52], lookAtOffset: [-20, -15, -20], cubeMenPos: [12, -5, 36] },
    { camera: [50, -20, 62], lookAtOffset: [0, -10, -20], cubeMenPos: [50, -25, 42] },
];

export const CUBEMEN_POSITIONS = [
    { position: [18, 10, 6], rotation: new Vector3(0, 0, 0) },
    { position: [12, -5, 36], rotation: new Vector3(0, 0, 0) },
    { position: [22, -12, 35], rotation: new Vector3(0, 0, 0) },
];

export const CAMERA_LOOK_AT_COLLISION_POSITIONS = {
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

export const SPRING_STRENGTH = 0.03;
export const DAMPING = 0.92;
