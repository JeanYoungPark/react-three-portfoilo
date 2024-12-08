import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const ground = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
];

export const Ground = () => {
    const dirt_block = useGLTF("./models/minecreft/Dirt Block.glb");
    const dead_tree = useGLTF("./models/minecreft/Dead Tree.glb");
    const dead_tree_2 = useGLTF("./models/minecreft/Dead Tree 2.glb");
    const crate = useGLTF("./models/minecreft/Crate.glb");
    const mushroom = useGLTF("./models/minecreft/Mushroom.glb");
    const rock = useGLTF("./models/minecreft/Rock.glb");
    const rock_large = useGLTF("./models/minecreft/Rock Large.glb");

    return (
        <group>
            <RigidBody type='fixed' colliders='trimesh'>
                {/* 땅 */}
                <group position={[0, 0, 0]}>
                    {ground.map((items, v) =>
                        items.map(
                            (item, h) =>
                                item && (
                                    <mesh
                                        key={v + h}
                                        geometry={dirt_block.nodes.Block_Dirt.geometry}
                                        position={[h * 2, 0, v * 2]}
                                        scale={[100, 100, 100]}
                                        material={dirt_block.materials.Atlas}
                                    />
                                )
                        )
                    )}
                </group>

                {/* 나무 */}
                <mesh
                    geometry={dead_tree.nodes.DeadTree_2.geometry}
                    position={[14, 1, 0]}
                    rotation={[0, -(Math.PI / 8), 0]}
                    scale={[140, 140, 140]}
                    material={dead_tree.materials.Atlas}
                />
                <mesh
                    geometry={dead_tree.nodes.DeadTree_2.geometry}
                    position={[22, 1, 12]}
                    rotation={[0, -(Math.PI / 3), 0]}
                    scale={[100, 100, 100]}
                    material={dead_tree.materials.Atlas}
                />
                <mesh
                    geometry={dead_tree_2.nodes.DeadTree_1.geometry}
                    position={[4, 1, 13.5]}
                    rotation={[0, -Math.PI / 3, 0]}
                    scale={[140, 180, 140]}
                    material={dead_tree.materials.Atlas}
                />

                {/*상자 */}
                <mesh
                    geometry={crate.nodes.Block_Crate.geometry}
                    position={[8, 2, 12.5]}
                    rotation={[0, Math.PI / 6, 0]}
                    scale={[100, 100, 100]}
                    material={crate.materials.Atlas}
                />
                <mesh
                    geometry={crate.nodes.Block_Crate.geometry}
                    position={[9.5, 2, 14.5]}
                    rotation={[0, -(Math.PI / 10), 0]}
                    scale={[100, 100, 100]}
                    material={crate.materials.Atlas}
                />
                <mesh
                    geometry={crate.nodes.Block_Crate.geometry}
                    position={[8.8, 4, 13.5]}
                    rotation={[0, Math.PI / 3, 0]}
                    scale={[100, 100, 100]}
                    material={crate.materials.Atlas}
                />
                <mesh
                    geometry={crate.nodes.Block_Crate.geometry}
                    position={[31, 2, 5]}
                    rotation={[0, Math.PI / 3, 0]}
                    scale={[100, 100, 100]}
                    material={crate.materials.Atlas}
                />

                {/* 버섯 */}
                <mesh
                    geometry={mushroom.nodes.Mushroom.geometry}
                    position={[16, 1, 0.5]}
                    rotation={[0, Math.PI / 2.5, 0]}
                    scale={[100, 100, 100]}
                    material={mushroom.materials.Atlas}
                />
                <mesh
                    geometry={mushroom.nodes.Mushroom.geometry}
                    position={[13, 1, 14]}
                    rotation={[0, -(Math.PI / 8), 0]}
                    scale={[70, 70, 70]}
                    material={mushroom.materials.Atlas}
                />
                <mesh
                    geometry={mushroom.nodes.Mushroom.geometry}
                    position={[26, 1, 5.5]}
                    rotation={[0, -(Math.PI / 6), 0]}
                    scale={[70, 70, 70]}
                    material={mushroom.materials.Atlas}
                />

                {/* 바위 */}
                <mesh
                    geometry={rock.nodes.Rock1.geometry}
                    position={[11, 1, 9]}
                    rotation={[0, Math.PI / 4, 0]}
                    scale={[100, 100, 100]}
                    material={rock.materials.Atlas}
                />
                <mesh geometry={rock.nodes.Rock1.geometry} position={[24, 1, 12]} scale={[70, 70, 70]} material={rock.materials.Atlas} />
                <mesh geometry={rock.nodes.Rock1.geometry} position={[25, 1, 12.3]} scale={[50, 50, 50]} material={rock.materials.Atlas} />
                <mesh
                    geometry={rock_large.nodes.Rock2.geometry}
                    position={[31.5, 1, 7.5]}
                    rotation={[0, Math.PI / 5, 0]}
                    scale={[100, 100, 100]}
                    material={rock_large.materials.Atlas}
                />
            </RigidBody>
        </group>
    );
};
