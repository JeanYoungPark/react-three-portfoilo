import { Html, useAnimations, useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAnimalAnimation } from "../../hook/main/useAnimalAnimation";
import { useCollisionObjStore } from "../../store/collisionObjStore";
import { useBubbleStore } from "../../store/bubbleStore";
import { useCartStore } from "../../store/cartStore";

const script = [<p>Have you tried pressing the 'Q', 'W', 'E', and 'R' keys?</p>];

export const Horse = ({ position, rotation }) => {
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Horse.glb");
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
            if (collisionOb?.name === "horse" && cartState === "done") {
                if (e.code === "Space") {
                    setAnim("Headbutt");
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
        [collisionOb, bubbleIdx, cartState]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <group position={position} rotation={rotation}>
            <group position={[0, 4, 0.5]}>
                <Html center>
                    <div className={`bubble ${isTalking && collisionOb?.name === "horse" && "off"}`}>
                        <b>...</b>
                    </div>
                </Html>
            </group>

            <RigidBody ref={rb} type='fixed' name='horse' lockRotations>
                <group ref={group}>
                    <primitive object={nodes.AnimalArmature} />
                    <skinnedMesh geometry={nodes.Horse.geometry} material={materials.AtlasMaterial} skeleton={nodes.Horse.skeleton} />
                </group>
                <CuboidCollider args={[0.7, 0.8, 1.3]} position={[0, 0.8, 0]} />
            </RigidBody>
        </group>
    );
};
