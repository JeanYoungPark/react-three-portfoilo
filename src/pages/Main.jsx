import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useRef, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import "../css/main.min.css";
import { Particles } from "../components/Particles";
import { Experience } from "../components/Experience";
import { CameraController } from "../components/CameraController";
import { Rail } from "../components/common/Rail";
import { CubeMan } from "../components/common/CubeMan";
import { useBubbleStore } from "../store/sheepBubbleStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowUp, faArrowDown, faArrowRight, faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";
import { useCollisionObjStore } from "../store/collisionObjStore";

const keyboardMap = [
    { name: "forward", keys: ["ArrowUp"] },
    { name: "backward", keys: ["ArrowDown"] },
    { name: "left", keys: ["ArrowLeft"] },
    { name: "right", keys: ["ArrowRight"] },
    { name: "run", keys: ["Shift"] },
    { name: "space", keys: ["Space"] },
    { name: "enter", keys: ["Enter"] },
];

export const Main = () => {
    const cubeManRef = useRef();
    const { ob } = useCollisionObjStore();
    const { text } = useBubbleStore();
    const [isClicked, setIsClicked] = useState(false);

    const toggleClicked = () => {
        setIsClicked((prev) => !prev);
    };

    return (
        <>
            <div id='wrap'>
                <KeyboardControls map={keyboardMap}>
                    <Canvas shadows>
                        <CameraController rb={cubeManRef} />
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[-2, 4, 10]} intensity={2.5} />
                        {/* <OrbitControls /> */}
                        <Suspense />
                        <Physics>
                            <group position={[0, 3, 0]}>
                                <Rail />
                                <CubeMan rb={cubeManRef} />
                                <Experience rb={cubeManRef} />
                            </group>
                        </Physics>
                        <Particles count={800} />
                    </Canvas>
                </KeyboardControls>
                <div id='guide'>
                    <p className='text'>You can Play with</p>
                    <p className='keys'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <FontAwesomeIcon icon={faArrowUp} />
                        <FontAwesomeIcon icon={faArrowDown} />
                        <FontAwesomeIcon icon={faArrowRight} /> <span>+</span> ( Space <span>or</span> Shift )
                    </p>
                </div>
                <div id='bubble' class={ob && text && "on"}>
                    {text}
                    <p class='enterIcon'>
                        <FontAwesomeIcon icon={faArrowTurnDown} />
                    </p>
                </div>
                <div id='detail_guide' onClick={toggleClicked}>
                    ?
                </div>
                <div id='guide_content' className={`${isClicked && "show"}`} onClick={toggleClicked}>
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
            </div>
            <div id='invalid'>
                Your screen is too small to play this game.
                <br />
                You need a screen of at least 1600px.
            </div>
        </>
    );
};
