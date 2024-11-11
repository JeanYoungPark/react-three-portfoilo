import React, { useRef } from "react";
import { Ground } from "./firstScene/Ground";
import { Fence } from "./firstScene/Fence";
import { Chick } from "./firstScene/Chick";
import { Chicken } from "./firstScene/Chicken";
import { Rail } from "./common/Rail";
import { Cat } from "./firstScene/Cat";
import { Chest } from "./firstScene/Chest";
import { useChestAction } from "../hook/main/useChestAction";

export const FirstScene = () => {
    const fenceRef = useRef();
    const { chestOpen, setChestOpen } = useChestAction();

    return (
        <group>
            <Ground />
            <Chest chestOpen={chestOpen} />
            <group>
                <Fence ref={fenceRef} />
                <Chicken fenceRef={fenceRef} position={[5, 1, 11]} />
                <Chick fenceRef={fenceRef} position={[5, 1, 7]} />
                <Chick fenceRef={fenceRef} position={[9, 1, 7]} />
                <Chick fenceRef={fenceRef} position={[7, 1, 12]} />
                <Chick fenceRef={fenceRef} position={[9, 1, 10]} />
            </group>
            <Cat setChestOpen={setChestOpen} />
        </group>
    );
};
