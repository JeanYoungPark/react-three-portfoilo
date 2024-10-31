import React, { useRef } from "react";
import { Ground } from "./ground/Ground";
import { Fence } from "./Fence";
import { Chick } from "./Chick";
import { Chicken } from "./Chicken";
import { Rail } from "./common/Rail";
import { Cat } from "./Cat";

export const SecondScene = ({ position }) => {
    const fenceRef = useRef();

    return (
        <group position={position}>
            <Ground />
            <group>
                {/* <Fence ref={fenceRef} />
                <Chick fenceRef={fenceRef} />
                <Chick fenceRef={fenceRef} />
                <Chick fenceRef={fenceRef} />
                <Chick fenceRef={fenceRef} />
                <Chicken fenceRef={fenceRef} />
                <Chicken fenceRef={fenceRef} /> */}
            </group>
            {/* <Rail />
            <Cat /> */}
        </group>
    );
};
