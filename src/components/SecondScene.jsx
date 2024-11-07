import React, { useRef } from "react";
import { Ground } from "./dirt/Ground";
import { House } from "./dirt/House";

export const SecondScene = ({ position }) => {
    return (
        <group position={position}>
            <Ground />
            <House />
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
