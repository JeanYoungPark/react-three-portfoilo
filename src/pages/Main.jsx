import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useRef } from "react";
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

    return (
        <>
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
            <div className='overlay' />
        </>
    );
};
