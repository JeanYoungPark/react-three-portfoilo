import { Vector3 } from "@react-three/fiber";

export interface RailSegment {
    position: [number, number, number];
    rotation: [number, number, number];
    isStop?: boolean;
    isCorner?: boolean;
    isIncline?: boolean;
}

export interface RailArrType {
    position: Vector3;
    rotation: Vector3;
    isStop?: boolean;
    isCorner?: boolean;
    isIncline?: boolean;
}
