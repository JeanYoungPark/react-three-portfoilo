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

const fence = [
    { position: [0, 0, 0], rotation: [0, Math.PI / 2, 0], isCorner: true },
    { position: [2, 0, 0], rotation: [0, 0, 0], isCorner: false },
    { position: [4, 0, 0], rotation: [0, 0, 0], isCorner: false },
    { position: [6, 0, 0], rotation: [0, 0, 0], isCorner: false },
    { position: [8, 0, 0], rotation: [0, 0, 0], isCorner: false },
    { position: [10, 0, 0], rotation: [0, 0, 0], isCorner: true },
    { position: [0, 0, 2], rotation: [0, Math.PI / 2, 0], isCorner: false },
    { position: [10, 0, 2], rotation: [0, Math.PI / 2, 0], isCorner: false },
    { position: [0, 0, 4], rotation: [0, Math.PI / 2, 0], isCorner: false },
    { position: [10, 0, 4], rotation: [0, Math.PI / 2, 0], isCorner: false },
    { position: [0, 0, 6], rotation: [0, Math.PI / 2, 0], isCorner: false },
    { position: [10, 0, 6], rotation: [0, Math.PI / 2, 0], isCorner: false },
    { position: [0, 0, 8], rotation: [0, Math.PI, 0], isCorner: true },
    { position: [2, 0, 8], rotation: [0, 0, 0], isCorner: false },
    { position: [4, 0, 8], rotation: [0, 0, 0], isCorner: false },
    { position: [6, 0, 8], rotation: [0, 0, 0], isCorner: false },
    { position: [8, 0, 8], rotation: [0, 0, 0], isCorner: false },
    { position: [10, 0, 8], rotation: [0, -(Math.PI / 2), 0], isCorner: true },
];

const rail = [
    { position: [0, 0, 0], rotation: [0, 0, 0], isCorner: false, isIncline: false },
    { position: [2, 0, 0], rotation: [0, 0, 0], isCorner: false, isIncline: false },
    { position: [4, 0, 0], rotation: [0, 0, 0], isCorner: false, isIncline: false },
    { position: [6, 0, 0], rotation: [0, 0, 0], isCorner: false, isIncline: false },
    { position: [8, 0, 0], rotation: [0, 0, 0], isCorner: false, isIncline: false },
    { position: [11, -1, 0], rotation: [0, 0, Math.PI / 2], isCorner: false, isIncline: true },
    { position: [12, -2, 0], rotation: [0, -(Math.PI / 2), 0], isCorner: true, isIncline: false },
    { position: [12, -2, 2], rotation: [0, Math.PI / 2, 0], isCorner: false, isIncline: false },
    { position: [12, -2, 4], rotation: [0, Math.PI / 2, 0], isCorner: false, isIncline: false },
    { position: [12, -2, 6], rotation: [0, Math.PI / 2, 0], isCorner: false, isIncline: false },
    { position: [12, -2, 8], rotation: [0, Math.PI / 2, 0], isCorner: true, isIncline: false },
    { position: [14, -2, 8], rotation: [0, 0, 0], isCorner: false, isIncline: false },
    { position: [16, -2, 8], rotation: [0, 0, 0], isCorner: false, isIncline: false },
    { position: [18, -2, 8], rotation: [0, 0, 0], isCorner: false, isIncline: false },
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

    const fence_center = useGLTF("./models/minecreft/Fence Center.glb");
    const fence_corner = useGLTF("./models/minecreft/Fence Corner.glb");

    const { nodes: rail_corner } = useGLTF("./models/minecreft/Rail Corner.glb");
    const { nodes: rail_incline } = useGLTF("./models/minecreft/Rail Incline.glb");
    const { nodes: rail_straight } = useGLTF("./models/minecreft/Rail Straight.glb");
    const minecart = useGLTF("./models/minecreft/minecart.glb");
    const wood_chest = useGLTF("./models/minecreft/Wood Chest.glb");
    console.log(flower2);
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

                {/* 울타리 */}
                <group position={[2, 2, 5]}>
                    {fence.map((data, idx) => (
                        <mesh
                            geometry={data.isCorner ? fence_corner.nodes.Fence_Corner.geometry : fence_center.nodes.Fence_Center.geometry}
                            position={data.position}
                            rotation={data.rotation}
                            scale={[100, 100, 100]}
                            material={fence_corner.materials.Atlas}
                        />
                    ))}
                </group>

                {/* 레일 */}
                <group position={[2, 3, 2]}>
                    <group position={[0, 0.1, 0]}>
                        <primitive object={minecart.nodes.Cart} />
                    </group>

                    {rail.map((data, index) => {
                        // 메쉬 복사본을 생성
                        const mesh = data.isCorner
                            ? rail_corner.Rail_Corner.clone()
                            : data.isIncline
                            ? rail_incline.Rail_Incline.clone()
                            : rail_straight.Rail_Straight.clone();

                        return (
                            <group key={index} position={data.position} rotation={data.rotation}>
                                <primitive object={mesh} />
                            </group>
                        );
                    })}

                    <group position={[20, -2, 8]} rotation={[0, -(Math.PI / 2), 0]}>
                        <primitive object={wood_chest.nodes.Chest_Closed} />
                    </group>

                    <group>
                        <mesh
                            geometry={grass_block.nodes.Block_Grass.geometry}
                            position={[0, -1, 0]}
                            scale={[100, 100, 100]}
                            material={grass_block.materials.Atlas}
                        />
                        <mesh
                            geometry={grass_block.nodes.Block_Grass.geometry}
                            position={[2, -1, 0]}
                            scale={[100, 100, 100]}
                            material={grass_block.materials.Atlas}
                        />
                        <mesh
                            geometry={grass_block.nodes.Block_Grass.geometry}
                            position={[4, -1, 0]}
                            scale={[100, 100, 100]}
                            material={grass_block.materials.Atlas}
                        />
                        <mesh
                            geometry={grass_block.nodes.Block_Grass.geometry}
                            position={[6, -1, 0]}
                            scale={[100, 100, 100]}
                            material={grass_block.materials.Atlas}
                        />
                        <mesh
                            geometry={grass_block.nodes.Block_Grass.geometry}
                            position={[8, -1, 0]}
                            scale={[100, 100, 100]}
                            material={grass_block.materials.Atlas}
                        />
                    </group>
                </group>

                <group>
                    <mesh
                        geometry={grass_block.nodes.Block_Grass.geometry}
                        position={[0, 2, 0]}
                        scale={[100, 100, 100]}
                        material={grass_block.materials.Atlas}
                    />
                    <mesh
                        geometry={grass_block.nodes.Block_Grass.geometry}
                        position={[0, 4, 0]}
                        scale={[100, 100, 100]}
                        material={grass_block.materials.Atlas}
                    />
                    <mesh
                        geometry={grass_block.nodes.Block_Grass.geometry}
                        position={[0, 6, 0]}
                        scale={[100, 100, 100]}
                        material={grass_block.materials.Atlas}
                    />
                    <mesh
                        geometry={grass_block.nodes.Block_Grass.geometry}
                        position={[2, 2, 0]}
                        scale={[100, 100, 100]}
                        material={grass_block.materials.Atlas}
                    />
                    <mesh
                        geometry={grass_block.nodes.Block_Grass.geometry}
                        position={[2, 4, 0]}
                        scale={[100, 100, 100]}
                        material={grass_block.materials.Atlas}
                    />
                    <mesh
                        geometry={grass_block.nodes.Block_Grass.geometry}
                        position={[4, 2, 0]}
                        scale={[100, 100, 100]}
                        material={grass_block.materials.Atlas}
                    />
                    <mesh
                        geometry={grass_block.nodes.Block_Grass.geometry}
                        position={[6, 2, 0]}
                        scale={[100, 100, 100]}
                        material={grass_block.materials.Atlas}
                    />
                    <mesh
                        geometry={grass_block.nodes.Block_Grass.geometry}
                        position={[8, 2, 0]}
                        scale={[100, 100, 100]}
                        material={grass_block.materials.Atlas}
                    />
                    <mesh
                        geometry={grass_block.nodes.Block_Grass.geometry}
                        position={[10, 2, 0]}
                        scale={[100, 100, 100]}
                        material={grass_block.materials.Atlas}
                    />
                    <mesh
                        geometry={grass_block.nodes.Block_Grass.geometry}
                        position={[0, 2, 2]}
                        scale={[100, 100, 100]}
                        material={grass_block.materials.Atlas}
                    />
                </group>

                <mesh geometry={bush.nodes.Bush.geometry} position={[4, 2, 0]} scale={[100, 100, 100]} material={bush.materials.Atlas} />
                <group position={[0, 6.4, 0]}>
                    <primitive object={flower.nodes.Flowers_1} />
                </group>
                <group position={[18.5, 1, 1]}>
                    <primitive object={flower2.nodes.Flowers_2} />
                </group>
                <mesh geometry={plant.nodes.Plant_2.geometry} position={[4, 1, 8]} scale={[50, 50, 50]} material={plant.materials.Atlas} />
                <mesh geometry={plant.nodes.Plant_2.geometry} position={[15.3, 1, 4]} scale={[50, 50, 50]} material={plant.materials.Atlas} />
                <mesh
                    geometry={plant.nodes.Plant_2.geometry}
                    position={[21, 1, 11.5]}
                    rotation={[0, Math.PI / 8, 0]}
                    scale={[50, 50, 50]}
                    material={plant.materials.Atlas}
                />
                <mesh geometry={rock.nodes.Rock1.geometry} position={[22, 1, 12]} scale={[70, 70, 70]} material={rock.materials.Atlas} />
                <mesh geometry={rock.nodes.Rock1.geometry} position={[21.5, 1, 12.3]} scale={[50, 50, 50]} material={rock.materials.Atlas} />
                <mesh
                    geometry={rock_large.nodes.Rock2.geometry}
                    position={[12.5, 1, 0]}
                    scale={[100, 100, 100]}
                    material={rock_large.materials.Atlas}
                />
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
                <mesh geometry={bush.nodes.Bush.geometry} position={[22, 1, 0]} scale={[100, 100, 100]} material={bush.materials.Atlas} />
                <mesh geometry={bush.nodes.Bush.geometry} position={[0, 1, 4]} scale={[100, 100, 100]} material={bush.materials.Atlas} />
                <mesh geometry={bush.nodes.Bush.geometry} position={[0, 0, 6]} scale={[100, 100, 100]} material={bush.materials.Atlas} />
                <mesh geometry={bush.nodes.Bush.geometry} position={[0, 0, 8]} scale={[100, 100, 100]} material={bush.materials.Atlas} />
            </RigidBody>
        </group>
    );
};
