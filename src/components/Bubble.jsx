import React from "react";
import { useCollisionObjStore } from "../store/collisionObjStore";
import { useBubbleStore } from "../store/bubbleStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";

export const Bubble = () => {
    const { ob } = useCollisionObjStore();
    const { text, isTalking } = useBubbleStore();

    return (
        <div id='bubble' className={ob && isTalking ? "on" : ""}>
            {text}
            <p className='enterIcon'>
                <FontAwesomeIcon icon={faArrowTurnDown} />
            </p>
        </div>
    );
};
