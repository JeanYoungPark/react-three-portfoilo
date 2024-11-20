import React, { useRef } from "react";
import { Ground } from "./secondScene/Ground";
import { House } from "./secondScene/House";
import { CubeMan } from "./common/CubeMan";

export const SecondScene = ({ position }) => {
    return (
        <group position={position}>
            <Ground />
            <group>
                <House position={[8, 2, 10]} rotation={[0, Math.PI / 2, 0]} />
                {/* <CubeMan /> */}
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
