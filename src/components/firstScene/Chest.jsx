import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useChestStore } from "../../store/chestStore";

export const Chest = ({ position, rotation }) => {
    const wood_chest_close = useGLTF("./models/minecreft/Wood Chest.glb");
    const wood_chest_open = useGLTF("./models/minecreft/Chest Open.glb");
    const cheese = useGLTF("./models/minecreft/Cheese Block.glb");

    const { chest } = useChestStore();

    return (
        <RigidBody type='fixed' lockRotations colliders='cuboid' name='chest' position={position} rotation={rotation}>
            {chest ? (
                <group>
                    <group>
                        <primitive object={wood_chest_open.nodes.Chest_Open} />
                    </group>
                    <group position={[0, 0.5, 0]} scale={[0.7, 0.7, 0.7]}>
                        <primitive object={cheese.nodes.Block_Cheese} />
                    </group>
                </group>
            ) : (
                <group>
                    <primitive object={wood_chest_close.nodes.Chest_Closed} />
                </group>
            )}
        </RigidBody>
    );
};
