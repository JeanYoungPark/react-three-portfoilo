import React from "react";
import { useCollisionObjStore } from "../store/collisionObjStore";
import { useBubbleStore } from "../store/bubbleStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";

export const Bubble = () => {
    const { ob } = useCollisionObjStore();
    const { text, isTalking } = useBubbleStore();

    const renderText = () => {
        if (text === null || text === undefined) {
            return "";
        }
        if (typeof text === "object") {
            if (React.isValidElement(text)) {
                return text;
            }

            return JSON.stringify(text);
        }
        return text;
    };

    return (
        <div id='bubble' className={ob && isTalking ? "on" : ""}>
            {renderText()}
            <p className='enterIcon'>
                <FontAwesomeIcon icon={faArrowTurnDown} />
            </p>
        </div>
    );
};
