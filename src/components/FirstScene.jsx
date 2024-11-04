import React, { useRef } from "react";
import { Ground } from "./ground/Ground";
import { Fence } from "./Fence";
import { Chick } from "./ground/Chick";
import { Chicken } from "./ground/Chicken";
import { Rail } from "./common/Rail";
import { Cat } from "./Cat";

export const FirstScene = () => {
    const fenceRef = useRef();

    return (
        <group>
            <Ground />
            <group>
                <Fence ref={fenceRef} />
                <Chicken fenceRef={fenceRef} position={[6, 1, 10]} />
                <Chick fenceRef={fenceRef} position={[5, 1, 7]} />
                <Chick fenceRef={fenceRef} position={[9, 1, 7]} />
                <Chick fenceRef={fenceRef} position={[7, 1, 12]} />
            </group>
            <Rail />
            <Cat />
        </group>
    );
};
