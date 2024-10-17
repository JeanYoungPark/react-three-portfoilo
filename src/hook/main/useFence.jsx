import React, { useEffect, useState } from "react";
import { MathUtils } from "three";
import { Box3, Vector3 } from "three";

const fenceWidth = 0.5;

export const useFence = ({ fenceRef, group }) => {
    const [targetPosition, setTargetPosition] = useState(null);
    // 울타리 경계 설정
    const [fenceBounds, setFenceBounds] = useState(null);

    // 울타리 내부 경계 계산
    const calculateInnerBounds = (outerBounds) => {
        return new Box3(
            new Vector3(
                MathUtils.randFloat(outerBounds.min.x + fenceWidth, outerBounds.max.x + fenceWidth),
                1,
                MathUtils.randFloat(outerBounds.min.z + fenceWidth, outerBounds.max.z + fenceWidth)
            ),
            new Vector3(outerBounds.max.x - fenceWidth, 1, outerBounds.max.z - fenceWidth)
        );
    };

    // 목표 위치를 랜덤으로 설정
    const setRandomTarget = (innerBounds) => {
        const randomX = MathUtils.randFloat(innerBounds.min.x, innerBounds.max.x);
        const randomZ = MathUtils.randFloat(innerBounds.min.z, innerBounds.max.z);
        setTargetPosition(new Vector3(randomX, 1, randomZ));
    };

    useEffect(() => {
        if (fenceRef?.current) {
            const box = new Box3().setFromObject(fenceRef.current);
            setFenceBounds(box);
            // 닭의 초기 위치를 울타리 내부로 설정
            const initialX = MathUtils.randFloat(box.min.x + fenceWidth, box.max.x - fenceWidth);
            const initialZ = MathUtils.randFloat(box.min.z + fenceWidth, box.max.z - fenceWidth);
            group.current.position.set(initialX, 1, initialZ);

            const innerBounds = calculateInnerBounds(box);
            setRandomTarget(innerBounds);
        }
    }, [fenceRef]);

    return { fenceBounds, calculateInnerBounds, targetPosition, setRandomTarget };
};
