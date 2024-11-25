import React from "react";
import { Ground } from "./thirdScene/Ground";
import { Igloo } from "./thirdScene/Igloo";

export const ThirdScene = ({ position }) => {
    return (
        <group position={position}>
            <Ground />
            <Igloo position={[8, 2, 18]} />
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
