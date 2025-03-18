import { Html, useAnimations, useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAnimalAnimation } from "../../hook/main/useAnimalAnimation";
import { useCollisionObjStore } from "../../store/collisionObjStore";
import { useBubbleStore } from "../../store/bubbleStore";
import { useCartStore } from "../../store/cartStore";

const script = [<p>Enter the door next to you 😁</p>, <p>There's nothing~!</p>];

export const Dog = ({ position, rotation }) => {
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Dog.glb");
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
            if (collisionOb?.name === "dog" && cartState === "done") {
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
            <group position={[0, 3, 0.5]}>
                <Html center>
                    <div className={`bubble ${isTalking && collisionOb?.name === "dog" && "off"}`}>
                        <b>...</b>
                    </div>
                </Html>
            </group>

            <RigidBody ref={rb} type='fixed' name='dog' lockRotations>
                <group ref={group}>
                    <primitive object={nodes.AnimalArmature} />
                    <skinnedMesh geometry={nodes.Dog.geometry} material={materials.AtlasMaterial} skeleton={nodes.Dog.skeleton} />
                </group>
                <CuboidCollider args={[0.7, 0.8, 1.3]} position={[0, 0.8, 0]} />
            </RigidBody>
        </group>
    );
};
