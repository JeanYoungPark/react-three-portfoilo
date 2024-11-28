import { Html, useAnimations, useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import { useCollisionObjStore } from "../../store/collisionObjStore";
import { useEnemyAnimation } from "../../hook/main/useEnemyAnimation";
import { useBubbleStore } from "../../store/sheepBubbleStore";
import { useCartStore } from "../../store/cartStore";

const script = [<>Yaaaargh!</>, <>ah? Who are you? You didn't visited here!</>];

export const Yeti = ({ position, rotation }) => {
    const { nodes, materials, animations } = useGLTF("./models/minecreft/Yeti.glb");
    const { ob: collisionOb } = useCollisionObjStore();
    const { text, setText } = useBubbleStore();
    const { state: cartState } = useCartStore();

    const [bubbleIdx, setBubbleIdx] = useState(0);

    const rb = useRef();
    const group = useRef();

    const { actions, mixer } = useAnimations(animations, group);
    const { setAnim } = useEnemyAnimation(actions, mixer);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (collisionOb?.name === "yeti" && cartState === "done") {
                if (e.code === "Enter") {
                    if (bubbleIdx > script.length) {
                        setText("");
                        setBubbleIdx(0);
                    } else {
                        if (bubbleIdx === 0) {
                            setAnim("Attack");
                        } else if (bubbleIdx === 1) {
                            setAnim("HitRecieve");
                        }
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
            <group position={[0, 4, 0]}>
                <Html center>
                    <div className={`bubble ${text && collisionOb?.name === "yeti" && "off"}`}>
                        <b>...</b>
                    </div>
                </Html>
            </group>

            <RigidBody ref={rb} type='fixed' name='yeti' lockRotations>
                <group ref={group}>
                    <primitive object={nodes.EnemyArmature} />
                    <skinnedMesh geometry={nodes.Yeti.geometry} material={materials.Atlas} skeleton={nodes.Yeti.skeleton} />
                </group>
                <CuboidCollider args={[1.5, 1.6, 1]} position={[0, 1.6, 0.5]} />
            </RigidBody>
        </group>
    );
};
