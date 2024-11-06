import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export const Chest = ({ chestOpen }) => {
    const wood_chest_close = useGLTF("./models/minecreft/Wood Chest.glb");
    const wood_chest_open = useGLTF("./models/minecreft/Chest Open.glb");
    const cheese = useGLTF("./models/minecreft/Cheese Block.glb");

    return (
        <RigidBody type='fixed' lockRotations colliders='cuboid' name='chest'>
            {chestOpen ? (
                <group position={[22, 1, 8]}>
                    <group rotation={[0, -(Math.PI / 2), 0]}>
                        <primitive object={wood_chest_open.nodes.Chest_Open} />
                    </group>
                    <group position={[0, 0.5, 0]} rotation={[0, -(Math.PI / 2), 0]} scale={[0.7, 0.7, 0.7]}>
                        <primitive object={cheese.nodes.Block_Cheese} />
                    </group>
                </group>
            ) : (
                <group position={[22, 1, 8]} rotation={[0, -(Math.PI / 2), 0]}>
                    <primitive object={wood_chest_close.nodes.Chest_Closed} />
                </group>
            )}
        </RigidBody>
    );
};
