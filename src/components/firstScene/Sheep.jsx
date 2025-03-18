import { Html, useAnimations, useGLTF } from "@react-three/drei";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAnimalAnimation } from "../../hook/main/useAnimalAnimation";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useCollisionObjStore } from "../../store/collisionObjStore";
import { useBubbleStore } from "../../store/bubbleStore";
import { useCartStore } from "../../store/cartStore";

const script = [
    <p>
        Hello! 😚 Welcome to <b>Jean Young's</b> Three.js project.
    </p>,
    <p>You can express your emotions using the 'Q', 'W', 'E', and 'R' keys.</p>,
    <p>Please enjoy this project! =)</p>,
];

export const Sheep = ({ position, rotation }) => {
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Sheep.glb");
    const { ob: collisionOb } = useCollisionObjStore();
    const { isTalking, setIsTalking } = useBubbleStore();
    const { state: cartState } = useCartStore();

    const rb = useRef();
    const group = useRef();
    const { actions, mixer } = useAnimations(animations, group);
    const { setAnim } = useAnimalAnimation(actions, mixer);

    const [bubbleIdx, setBubbleIdx] = useState(0);

    const handleKeyDown = useCallback(
        (e) => {
            if (collisionOb?.name === "sheep" && cartState === "done") {
                if (e.code === "Space") {
                    setAnim("Idle_Eating");
                } else if (e.code === "Enter") {
                    if (bubbleIdx >= script.length) {
                        setIsTalking({ text: "", isTalking: false });
                        setBubbleIdx(0);
                    } else {
                        setIsTalking({ text: script[bubbleIdx], isTalking: true });

                        const nextBubbleIdx = bubbleIdx + 1;
                        setBubbleIdx(nextBubbleIdx);
                    }
                }
            }
        },
        [collisionOb, cartState, bubbleIdx]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <group position={position} rotation={rotation}>
            <group position={[0, 2.5, 0]}>
                <Html center>
                    <div className={`bubble ${isTalking && collisionOb?.name === "sheep" && "off"}`}>
                        <b>...</b>
                    </div>
                </Html>
            </group>

            <RigidBody ref={rb} type='fixed' name='sheep' lockRotations>
                <group ref={group}>
                    <primitive object={nodes.AnimalArmature} />
                    <skinnedMesh geometry={nodes.Sheep.geometry} material={materials.AtlasMaterial} skeleton={nodes.Sheep.skeleton} />
                </group>
                <CuboidCollider args={[0.7, 0.8, 1.3]} position={[0, 0.6, 0]} />
            </RigidBody>
        </group>
    );
};
