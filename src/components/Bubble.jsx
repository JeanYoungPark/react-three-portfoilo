import React from "react";
import { useCollisionObjStore } from "../store/collisionObjStore";
import { useBubbleStore } from "../store/sheepBubbleStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";

export const Bubble = () => {
    const { ob } = useCollisionObjStore();
    const { text } = useBubbleStore();

    return (
        <div id='bubble' class={ob && text && "on"}>
            {text}
            <p class='enterIcon'>
                <FontAwesomeIcon icon={faArrowTurnDown} />
            </p>
        </div>
    );
};
