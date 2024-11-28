import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React from "react";

const ground = [
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
];

export const Ground = () => {
    const snow_block = useGLTF("./models/minecreft/Snow Block.glb");
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
                                        geometry={snow_block.nodes.Block_Snow.geometry}
                                        position={[h * 2, 0, v * 2]}
                                        scale={[100, 100, 100]}
                                        material={snow_block.materials.Atlas}
                                    />
                                )
                        )
                    )}
                </group>

                {/* 바위 */}
                <mesh
                    geometry={rock.nodes.Rock1.geometry}
                    position={[5, 1, 9]}
                    rotation={[0, Math.PI / 4, 0]}
                    scale={[200, 200, 200]}
                    material={rock.materials.Atlas}
                />
                <mesh
                    geometry={rock.nodes.Rock1.geometry}
                    position={[2.5, 1, 11]}
                    rotation={[0, -(Math.PI / 8), 0]}
                    scale={[300, 300, 200]}
                    material={rock.materials.Atlas}
                />
                <mesh
                    geometry={rock_large.nodes.Rock2.geometry}
                    position={[3, 1, 7]}
                    rotation={[0, Math.PI / 5, 0]}
                    scale={[100, 100, 100]}
                    material={rock_large.materials.Atlas}
                />
                <mesh
                    geometry={rock_large.nodes.Rock2.geometry}
                    position={[6, 1, 22]}
                    rotation={[0, 0, 0]}
                    scale={[100, 100, 100]}
                    material={rock_large.materials.Atlas}
                />
                <mesh
                    geometry={rock.nodes.Rock1.geometry}
                    position={[5, 1, 23]}
                    rotation={[0, -(Math.PI / 8), 0]}
                    scale={[50, 50, 50]}
                    material={rock.materials.Atlas}
                />
                <mesh
                    geometry={rock.nodes.Rock1.geometry}
                    position={[2.5, 1, 20]}
                    rotation={[0, -(Math.PI / 4), 0]}
                    scale={[50, 50, 50]}
                    material={rock.materials.Atlas}
                />
                <mesh
                    geometry={rock.nodes.Rock1.geometry}
                    position={[20, 1, 18]}
                    rotation={[0, Math.PI / 4, 0]}
                    scale={[70, 100, 50]}
                    material={rock.materials.Atlas}
                />
                <mesh
                    geometry={rock.nodes.Rock1.geometry}
                    position={[27.5, 1, 10]}
                    rotation={[0, (Math.PI / 5) * 4, 0]}
                    scale={[70, 70, 50]}
                    material={rock.materials.Atlas}
                />
                <mesh
                    geometry={rock_large.nodes.Rock2.geometry}
                    position={[27, 1, 13]}
                    rotation={[0, Math.PI / 5, 0]}
                    scale={[100, 130, 120]}
                    material={rock_large.materials.Atlas}
                />
            </RigidBody>
        </group>
    );
};
