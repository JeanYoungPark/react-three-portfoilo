import { Html, useAnimations, useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { useAnimalAnimation } from "../../hook/main/useAnimalAnimation";
import { useCollisionObjStore } from "../../store/collisionObjStore";
import { useBubbleStore } from "../../store/bubbleStore";
import { useCartStore } from "../../store/cartStore";

const script = [<p>Try to punch enemies. Of course I'm not a enemy.😅 (oink oink)</p>];

export const Pig = ({ position, rotation }) => {
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Pig.glb");
    const { ob: collisionOb } = useCollisionObjStore();
    const { isTalking, setIsTalking } = useBubbleStore();
    const { state: cartState } = useCartStore();

    const [bubbleIdx, setBubbleIdx] = useState(0);

    const rb = useRef();
    const group = useRef();

    const { actions, mixer } = useAnimations(animations, group);
    const { setAnim } = useAnimalAnimation(actions, mixer);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (collisionOb?.name === "pig" && cartState === "done") {
                if (e.code === "Space") {
                    setAnim("Idle_Eating");
                } else if (e.code === "Enter") {
                    const nextBubbleIdx = bubbleIdx + 1;

                    if (nextBubbleIdx === script.length) {
                        setIsTalking({ text: "", isTalking: false });
                        setBubbleIdx(0);
                    } else {
                        setIsTalking({ text: script[bubbleIdx], isTalking: true });
                        setBubbleIdx(nextBubbleIdx);
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [collisionOb, bubbleIdx, cartState, setAnim, setIsTalking]);

    return (
        <group position={position} rotation={rotation}>
            <group position={[0, 3, 0]}>
                <Html center>
                    <div className={`bubble ${isTalking && collisionOb?.name === "pig" && "off"}`}>
                        <b>...</b>
                    </div>
                </Html>
            </group>

            <RigidBody ref={rb} type='fixed' name='pig' lockRotations>
                <group ref={group}>
                    <primitive object={nodes.AnimalArmature} />
                    <skinnedMesh geometry={nodes.Pig.geometry} material={materials.AtlasMaterial} skeleton={nodes.Pig.skeleton} />
                </group>
                <CuboidCollider args={[0.7, 0.8, 1.3]} position={[0, 0.8, 0]} />
            </RigidBody>
        </group>
    );
};
