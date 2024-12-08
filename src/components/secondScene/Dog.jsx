import { Html, useAnimations, useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { useAnimalAnimation } from "../../hook/main/useAnimalAnimation";
import { useCollisionObjStore } from "../../store/collisionObjStore";
import { useBubbleStore } from "../../store/sheepBubbleStore";
import { useCartStore } from "../../store/cartStore";

const script = [<p>Enter the door next to you 😁</p>, <p>There's nothing~!</p>];

export const Dog = ({ position, rotation }) => {
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Dog.glb");
    const { ob: collisionOb } = useCollisionObjStore();
    const { text, setText } = useBubbleStore();
    const { state: cartState } = useCartStore();

    const rb = useRef();
    const group = useRef();

    const { actions, mixer } = useAnimations(animations, group);
    const { setAnim } = useAnimalAnimation(actions, mixer);

    const [bubbleIdx, setBubbleIdx] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (collisionOb?.name === "dog" && cartState === "done") {
                if (e.code === "Space") {
                    setAnim("Headbutt");
                } else if (e.code === "Enter") {
                    if (bubbleIdx > script.length) {
                        setText("");
                        setBubbleIdx(0);
                    } else {
                        setBubbleIdx((prev) => prev + 1);
                    }

                    setText(script[bubbleIdx]);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [collisionOb, bubbleIdx, cartState, setAnim, setText]);

    return (
        <group position={position} rotation={rotation}>
            <group position={[0, 3, 0.5]}>
                <Html center>
                    <div className={`bubble ${text && collisionOb?.name === "dog" && "off"}`}>
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
