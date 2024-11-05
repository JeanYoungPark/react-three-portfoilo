import React, { useRef } from "react";
import { Ground } from "./ground/Ground";
import { Fence } from "./Fence";
import { Chick } from "./ground/Chick";
import { Chicken } from "./ground/Chicken";
import { Rail } from "./common/Rail";
import { Cat } from "./ground/Cat";

export const FirstScene = () => {
    const fenceRef = useRef();

    return (
        <group>
            <Ground />
            <group>
                <Fence ref={fenceRef} />
                <Chicken fenceRef={fenceRef} position={[5, 1, 11]} />
                <Chick fenceRef={fenceRef} position={[5, 1, 7]} />
                <Chick fenceRef={fenceRef} position={[9, 1, 7]} />
                <Chick fenceRef={fenceRef} position={[7, 1, 12]} />
                <Chick fenceRef={fenceRef} position={[9, 1, 10]} />
            </group>
            <Rail />
            <Cat />
        </group>
    );
};
