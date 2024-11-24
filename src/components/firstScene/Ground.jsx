import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React from "react";

const ground = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const Ground = () => {
    const grass_block = useGLTF("./models/minecreft/Grass Block.glb");
    const dirt_block = useGLTF("./models/minecreft/Dirt Block.glb");

    const bush = useGLTF("./models/minecreft/Bush.glb");
    const flower = useGLTF("./models/minecreft/Flowers.glb");
    const flower2 = useGLTF("./models/minecreft/Flowers2.glb");
    const plant = useGLTF("./models/minecreft/Plant.glb");
    const rock = useGLTF("./models/minecreft/Rock.glb");
    const rock_large = useGLTF("./models/minecreft/Rock Large.glb");
    const tree = useGLTF("./models/minecreft/Tree.glb");
    const tree3 = useGLTF("./models/minecreft/Tree3.glb");

    return (
        <group>
            <RigidBody type='fixed' colliders='trimesh'>
                {/* 땅 */}
                <group position={[0, 0, 0]}>
                    {ground.map((items, v) =>
                        items.map((item, h) => (
                            <mesh
                                key={v + h}
                                geometry={item ? dirt_block.nodes.Block_Dirt.geometry : grass_block.nodes.Block_Grass.geometry}
                                position={[h * 2, 0, v * 2]}
                                scale={[100, 100, 100]}
                                material={item ? dirt_block.materials.Atlas : grass_block.materials.Atlas}
                            />
                        ))
                    )}
                </group>

                {/* 꽃 */}
                <primitive position={[0, 1, 0]} object={flower.nodes.Flowers_1} />
                <primitive position={[18.5, 1, 1]} object={flower2.nodes.Flowers_2} />

                {/* 잡초 */}
                <mesh geometry={plant.nodes.Plant_2.geometry} position={[4, 1, 8]} scale={[50, 50, 50]} material={plant.materials.Atlas} />
                <mesh geometry={plant.nodes.Plant_2.geometry} position={[6, 1, 14.3]} scale={[50, 50, 50]} material={plant.materials.Atlas} />
                <mesh geometry={plant.nodes.Plant_2.geometry} position={[11.2, 1, 0.4]} scale={[30, 30, 30]} material={plant.materials.Atlas} />
                <mesh geometry={plant.nodes.Plant_2.geometry} position={[14.6, 1, 4]} scale={[30, 30, 30]} material={plant.materials.Atlas} />
                <mesh
                    geometry={plant.nodes.Plant_2.geometry}
                    position={[21, 1, 11.5]}
                    rotation={[0, Math.PI / 8, 0]}
                    scale={[50, 50, 50]}
                    material={plant.materials.Atlas}
                />

                {/* 바위 */}
                <mesh geometry={rock.nodes.Rock1.geometry} position={[22, 1, 12]} scale={[70, 70, 70]} material={rock.materials.Atlas} />
                <mesh geometry={rock.nodes.Rock1.geometry} position={[21.5, 1, 12.3]} scale={[50, 50, 50]} material={rock.materials.Atlas} />
                <mesh
                    geometry={rock_large.nodes.Rock2.geometry}
                    position={[12.5, 1, 0]}
                    scale={[100, 100, 100]}
                    material={rock_large.materials.Atlas}
                />

                {/* 나무 */}
                <mesh
                    geometry={tree.nodes.Tree_3.geometry}
                    position={[14, 1, 0]}
                    rotation={[0, -(Math.PI / 8), 0]}
                    scale={[100, 100, 100]}
                    material={tree.materials.Atlas}
                />
                <mesh
                    geometry={tree3.nodes.Tree_1.geometry}
                    position={[20, 1, 0]}
                    rotation={[0, Math.PI, 0]}
                    scale={[100, 100, 100]}
                    material={tree.materials.Atlas}
                />

                {/* 덤불 */}
                <mesh geometry={bush.nodes.Bush.geometry} position={[4, 1, 0]} scale={[50, 50, 50]} material={bush.materials.Atlas} />
                <mesh geometry={bush.nodes.Bush.geometry} position={[22, 1, 0]} scale={[100, 100, 100]} material={bush.materials.Atlas} />
                <mesh geometry={bush.nodes.Bush.geometry} position={[0, 1, 10]} scale={[100, 100, 100]} material={bush.materials.Atlas} />
                <mesh geometry={bush.nodes.Bush.geometry} position={[0, 0, 6]} scale={[100, 100, 100]} material={bush.materials.Atlas} />
                <mesh geometry={bush.nodes.Bush.geometry} position={[0, 0, 8]} scale={[100, 100, 100]} material={bush.materials.Atlas} />
            </RigidBody>
        </group>
    );
};
