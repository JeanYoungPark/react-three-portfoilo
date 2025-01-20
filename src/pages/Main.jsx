import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { createContext, Suspense, useRef } from "react";
import { KeyboardControls } from "@react-three/drei";
import "../css/main.min.css";
import { Particles } from "../components/Particles";
import { Experience } from "../components/Experience";
import { CameraController } from "../components/CameraController";
import { Rail } from "../components/common/Rail";
import { CubeMan } from "../components/common/CubeMan";
import { Guide } from "../components/Guide";
import { Invalid } from "../components/Invalid";
import { Bubble } from "../components/Bubble";

const keyboardMap = [
    { name: "forward", keys: ["ArrowUp"] },
    { name: "backward", keys: ["ArrowDown"] },
    { name: "left", keys: ["ArrowLeft"] },
    { name: "right", keys: ["ArrowRight"] },
    { name: "run", keys: ["Shift"] },
    { name: "space", keys: ["Space"] },
    { name: "enter", keys: ["Enter"] },
];

export const CubeManContext = createContext();

export const Main = () => {
    const cubeManRef = useRef(null);

    return (
        <>
            <div id='wrap'>
                {/* 키보드 입력 감지 */}
                <KeyboardControls map={keyboardMap}>
                    {/* 3D 오브젝트 렌더링 */}
                    <Canvas shadows>
                        <CubeManContext.Provider value={{ cubeManRef }}>
                            {/* - */}
                            <CameraController />
                            {/* 전역조명 */}
                            <ambientLight intensity={1.5} />
                            {/* 직접조명 */}
                            <directionalLight position={[-2, 4, 10]} intensity={2.5} />
                            {/* <OrbitControls /> */}
                            <Suspense />
                            {/* 중력, 충돌 적용 */}
                            <Physics>
                                <group position={[0, 3, 0]}>
                                    <Rail />
                                    <CubeMan />
                                    <Experience />
                                </group>
                            </Physics>
                            <Particles count={800} />
                        </CubeManContext.Provider>
                    </Canvas>
                </KeyboardControls>

                <Bubble />
                <Guide />
            </div>
            <Invalid />
        </>
    );
};
