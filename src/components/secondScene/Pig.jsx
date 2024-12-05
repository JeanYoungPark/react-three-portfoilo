import { Html, useAnimations, useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import { useAnimalAnimation } from "../../hook/main/useAnimalAnimation";
import { useCollisionObjStore } from "../../store/collisionObjStore";
import { useBubbleStore } from "../../store/sheepBubbleStore";
import { useCartStore } from "../../store/cartStore";

const script = [<p>Try to punch enemies. Of course I'm not a enemy.😅 (oink oink)</p>];

export const Pig = ({ position, rotation }) => {
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Pig.glb");
    const { ob: collisionOb } = useCollisionObjStore();
    const { text, setText } = useBubbleStore();
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
    }, [collisionOb, bubbleIdx]);

    return (
        <group position={position} rotation={rotation}>
            <group position={[0, 3, 0]}>
                <Html center>
                    <div className={`bubble ${text && collisionOb?.name === "pig" && "off"}`}>
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
