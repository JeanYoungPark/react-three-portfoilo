import React, { useRef } from "react";
import { Ground } from "./ground/Ground";
import { Fence } from "./ground/Fence";
import { Chick } from "./ground/Chick";
import { Chicken } from "./ground/Chicken";
import { Rail } from "./common/Rail";
import { Cat } from "./ground/Cat";
import { Chest } from "./ground/Chest";
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
