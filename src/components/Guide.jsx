import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowUp, faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const Guide = () => {
    const [guideBtnIsClicked, setGuideBtnIsClicked] = useState(false);

    const toggleGuideBtnClicked = () => {
        setGuideBtnIsClicked((prev) => !prev);
    };

    return (
        <>
            <div id='guideTop'>
                <p className='text'>You can Play with</p>
                <p className='keys'>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <FontAwesomeIcon icon={faArrowUp} />
                    <FontAwesomeIcon icon={faArrowDown} />
                    <FontAwesomeIcon icon={faArrowRight} /> <span>+</span> ( Space <span>or</span> Shift )
                </p>
            </div>
            <div id='guideDetail' onClick={guideBtnIsClicked}>
                ?
            </div>
            <div id='guideBottom' className={`${guideBtnIsClicked && "show"}`} onClick={toggleGuideBtnClicked}>
                <table>
                    <colgroup>
                        <col style={{ width: "200px" }} />
                        <col style={{ width: "200px" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Arrow Keys</td>
                            <td>Move</td>
                        </tr>
                        <tr>
                            <td>Shift</td>
                            <td>Run</td>
                        </tr>
                        <tr>
                            <td>Space</td>
                            <td>Jump</td>
                        </tr>
                        <tr>
                            <td>Q, W</td>
                            <td>Express Emotion</td>
                        </tr>
                        <tr>
                            <td>E</td>
                            <td>Attack</td>
                        </tr>
                        <tr>
                            <td>Enter</td>
                            <td>Interact</td>
                        </tr>
                        <tr>
                            <td>Scroll</td>
                            <td>Next Scene</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};
