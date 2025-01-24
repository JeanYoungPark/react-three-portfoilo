export interface RailSegment {
    position: [number, number, number];
    rotation: [number, number, number];
    isStop?: boolean;
    isCorner?: boolean;
    isIncline?: boolean;
}
