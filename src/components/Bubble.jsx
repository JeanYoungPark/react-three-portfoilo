import React from "react";
import { useCollisionObjStore } from "../store/collisionObjStore";
import { useBubbleStore } from "../store/sheepBubbleStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";

export const Bubble = () => {
    const { ob } = useCollisionObjStore();
    const { text } = useBubbleStore();

    return (
        <div id='bubble' className={ob && text && "on"}>
            {text}
            <p className='enterIcon'>
                <FontAwesomeIcon icon={faArrowTurnDown} />
            </p>
        </div>
    );
};
