import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { forwardRef, useEffect } from "react";

const models = [
    "./models/pack/Floor Grass Sliced A.glb",
    "./models/pack/Floor Grass Sliced B-.glb",
    "./models/pack/Floor Grass Sliced C.glb",
    "./models/pack/Floor Grass Sliced D.glb",
    "./models/pack/Floor Grass Sliced E.glb",
    "./models/pack/Floor Grass Sliced F.glb",
    "./models/pack/Floor Grass Sliced G.glb",
    "./models/pack/Floor Grass Sliced H.glb",
    "./models/pack/Floor Grass Sliced I.glb",
];

export const Floor = forwardRef((props, ref) => {
    const floor_grass_sliced_A = useGLTF("./models/pack/Floor Grass Sliced A.glb");
    const floor_grass_sliced_B = useGLTF("./models/pack/Floor Grass Sliced B-.glb");
    const floor_grass_sliced_C = useGLTF("./models/pack/Floor Grass Sliced C.glb");
    const floor_grass_sliced_D = useGLTF("./models/pack/Floor Grass Sliced D.glb");
    const floor_grass_sliced_E = useGLTF("./models/pack/Floor Grass Sliced E.glb");
    const floor_grass_sliced_F = useGLTF("./models/pack/Floor Grass Sliced F.glb");
    const floor_grass_sliced_G = useGLTF("./models/pack/Floor Grass Sliced G.glb");
    const floor_grass_sliced_H = useGLTF("./models/pack/Floor Grass Sliced H.glb");
    const floor_grass_sliced_I = useGLTF("./models/pack/Floor Grass Sliced I.glb");

    const hedge_corner = useGLTF("./models/pack/Hedge Corner.glb");
    const hedge_straight_long = useGLTF("./models/pack/Hedge Straight Long.glb");

    const fountain = useGLTF("./models/pack/Fountain.glb");
    const bench = useGLTF("./models/pack/Bench.glb");

    const tree_large = useGLTF("./models/pack/Tree Large.glb");
    const tree = useGLTF("./models/pack/Tree.glb");

    const lantern = useGLTF("./models/pack/Street Lantern.glb");
    const trashcan = useGLTF("./models/pack/Trashcan.glb");

    const cobble_large = useGLTF("./models/pack/Cobble Stones Large.glb");
    const cobble = useGLTF("./models/pack/Cobble Stones.glb");
    const bird = useGLTF("./models/pack/Bird.glb");

    // const bush = useGLTF("./models/pack/Bush.glb");
    // const busg = useGLTF("./models/pack/Bush.glb");

    const grass_A = useGLTF("./models/pack/Grass A.glb");
    const grass_B = useGLTF("./models/pack/Grass B.glb");

    return (
        <group ref={ref}>
            <RigidBody type='fixed' colliders='trimesh'>
                <group>
                    <mesh
                        geometry={floor_grass_sliced_A.nodes.floor_grass_sliced_A.geometry}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_A.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_B.nodes.floor_grass_sliced_B.geometry}
                        position={[2, 0, 0]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_B.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_B.nodes.floor_grass_sliced_B.geometry}
                        position={[4, 0, 0]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_B.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_B.nodes.floor_grass_sliced_B.geometry}
                        position={[6, 0, 0]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_B.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_B.nodes.floor_grass_sliced_B.geometry}
                        position={[8, 0, 0]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_B.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_B.nodes.floor_grass_sliced_B.geometry}
                        position={[10, 0, 0]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_B.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_C.nodes.floor_grass_sliced_C.geometry}
                        position={[12, 0, 0]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_C.materials.tiny_treats_grass}
                    />

                    <mesh
                        geometry={floor_grass_sliced_D.nodes.floor_grass_sliced_D.geometry}
                        position={[0, 0, 2]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_D.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_E.nodes.floor_grass_sliced_E.geometry}
                        position={[2, 0, 2]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_E.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_E.nodes.floor_grass_sliced_E.geometry}
                        position={[4, 0, 2]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_E.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_E.nodes.floor_grass_sliced_E.geometry}
                        position={[6, 0, 2]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_E.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_E.nodes.floor_grass_sliced_E.geometry}
                        position={[8, 0, 2]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_E.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_E.nodes.floor_grass_sliced_E.geometry}
                        position={[10, 0, 2]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_E.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_F.nodes.floor_grass_sliced_F.geometry}
                        position={[12, 0, 2]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_F.materials.tiny_treats_grass}
                    />

                    <mesh
                        geometry={floor_grass_sliced_D.nodes.floor_grass_sliced_D.geometry}
                        position={[0, 0, 4]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_D.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_E.nodes.floor_grass_sliced_E.geometry}
                        position={[2, 0, 4]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_E.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_E.nodes.floor_grass_sliced_E.geometry}
                        position={[4, 0, 4]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_E.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_E.nodes.floor_grass_sliced_E.geometry}
                        position={[6, 0, 4]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_E.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_E.nodes.floor_grass_sliced_E.geometry}
                        position={[8, 0, 4]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_E.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_E.nodes.floor_grass_sliced_E.geometry}
                        position={[10, 0, 4]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_E.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_F.nodes.floor_grass_sliced_F.geometry}
                        position={[12, 0, 4]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_F.materials.tiny_treats_grass}
                    />

                    <mesh
                        geometry={floor_grass_sliced_D.nodes.floor_grass_sliced_D.geometry}
                        position={[0, 0, 6]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_D.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_E.nodes.floor_grass_sliced_E.geometry}
                        position={[2, 0, 6]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_E.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_E.nodes.floor_grass_sliced_E.geometry}
                        position={[4, 0, 6]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_E.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_E.nodes.floor_grass_sliced_E.geometry}
                        position={[6, 0, 6]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_E.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_E.nodes.floor_grass_sliced_E.geometry}
                        position={[8, 0, 6]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_E.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_E.nodes.floor_grass_sliced_E.geometry}
                        position={[10, 0, 6]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_E.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_F.nodes.floor_grass_sliced_F.geometry}
                        position={[12, 0, 6]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_F.materials.tiny_treats_grass}
                    />

                    <mesh
                        geometry={floor_grass_sliced_G.nodes.floor_grass_sliced_G.geometry}
                        position={[0, 0, 8]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_G.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_H.nodes.floor_grass_sliced_H.geometry}
                        position={[2, 0, 8]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_H.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_H.nodes.floor_grass_sliced_H.geometry}
                        position={[4, 0, 8]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_H.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_H.nodes.floor_grass_sliced_H.geometry}
                        position={[6, 0, 8]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_H.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_H.nodes.floor_grass_sliced_H.geometry}
                        position={[8, 0, 8]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_H.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_H.nodes.floor_grass_sliced_H.geometry}
                        position={[10, 0, 8]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_H.materials.tiny_treats_grass}
                    />
                    <mesh
                        geometry={floor_grass_sliced_I.nodes.floor_grass_sliced_I.geometry}
                        position={[12, 0, 8]}
                        scale={[100, 100, 100]}
                        material={floor_grass_sliced_I.materials.tiny_treats_grass}
                    />
                </group>

                <group>
                    <mesh
                        geometry={hedge_corner.nodes.hedge_corner.geometry}
                        scale={[100, 100, 100]}
                        position={[0, 0, 0]}
                        material={hedge_corner.materials.tiny_treats_1}
                    />
                    <mesh
                        geometry={hedge_straight_long.nodes.hedge_straight_long.geometry}
                        scale={[100, 100, 100]}
                        position={[0, 0, 4]}
                        rotation={[0, -(Math.PI / 2), 0]}
                        material={hedge_straight_long.materials.tiny_treats_1}
                    />
                    <mesh
                        geometry={hedge_straight_long.nodes.hedge_straight_long.geometry}
                        scale={[100, 100, 100]}
                        position={[4, 0, 0]}
                        material={hedge_straight_long.materials.tiny_treats_1}
                    />
                    <mesh
                        geometry={hedge_straight_long.nodes.hedge_straight_long.geometry}
                        scale={[100, 100, 100]}
                        position={[8, 0, 0]}
                        material={hedge_straight_long.materials.tiny_treats_1}
                    />
                    <mesh
                        geometry={hedge_corner.nodes.hedge_corner.geometry}
                        scale={[100, 100, 100]}
                        position={[12, 0, 0]}
                        rotation={[0, -(Math.PI / 2), 0]}
                        material={hedge_corner.materials.tiny_treats_1}
                    />
                </group>

                <group position={[1.2, 0, 1.2]}>
                    <group position={[5.5, 0, 3.5]}>
                        <mesh geometry={fountain.nodes.fountain.geometry} scale={[100, 100, 100]} material={fountain.materials.tiny_treats_1} />
                        <mesh
                            geometry={fountain.nodes.fountain_leaves.geometry}
                            scale={[100, 100, 100]}
                            material={fountain.materials.tiny_treats_1}
                        />
                        <mesh geometry={fountain.nodes.fountain_water.geometry} scale={[100, 100, 100]} material={fountain.materials.tiny_treats_1} />
                        <mesh
                            geometry={bird.nodes.bird.geometry}
                            scale={[100, 100, 100]}
                            position={[0.5, 1.6, -0.3]}
                            rotation={[-(Math.PI / 10), -(Math.PI / 3), -(Math.PI / 10)]}
                            material={bird.materials.tiny_treats_1}
                        />
                    </group>

                    <group>
                        <mesh
                            geometry={bench.nodes.bench.geometry}
                            position={[1.3, 0, 2.1]}
                            scale={[100, 100, 100]}
                            rotation={[0, Math.PI / 3, 0]}
                            material={bench.materials.tiny_treats_1}
                        />

                        <mesh
                            geometry={tree_large.nodes.tree_large.geometry}
                            position={[0.3, 0, 0.5]}
                            scale={[100, 100, 100]}
                            rotation={[0, Math.PI / 3, 0]}
                            material={tree_large.materials.tiny_treats_1}
                        />
                        <mesh
                            geometry={tree.nodes.tree.geometry}
                            position={[2, 0, 0]}
                            scale={[100, 100, 100]}
                            rotation={[0, Math.PI / 3, 0]}
                            material={tree.materials.tiny_treats_1}
                        />
                    </group>

                    <group position={[9.5, 0, 0]}>
                        <mesh
                            geometry={lantern.nodes.street_lantern.geometry}
                            position={[0, 0, 0.5]}
                            scale={[100, 100, 100]}
                            material={lantern.materials.tiny_treats_1}
                        />
                        <mesh
                            geometry={trashcan.nodes.trashcan.geometry}
                            position={[-0.8, 0, 0]}
                            scale={[100, 100, 100]}
                            material={trashcan.materials.tiny_treats_1}
                        />
                    </group>

                    <mesh
                        geometry={cobble_large.nodes.cobble_stones_large.geometry}
                        position={[9.5, 0, 5]}
                        scale={[100, 100, 100]}
                        rotation={[0, Math.PI / 8, 0]}
                        material={cobble_large.materials.tiny_treats_1}
                    />

                    <mesh
                        geometry={cobble.nodes.cobble_stones.geometry}
                        position={[9, 0, 3]}
                        scale={[100, 100, 100]}
                        rotation={[0, -(Math.PI / 6), 0]}
                        material={cobble.materials.tiny_treats_1}
                    />

                    <mesh
                        geometry={grass_A.nodes.grass_A.geometry}
                        position={[7, 0, 4.9]}
                        scale={[100, 100, 100]}
                        material={grass_A.materials.tiny_treats_1}
                    />
                    <mesh
                        geometry={grass_B.nodes.grass_B.geometry}
                        position={[2, 0, 0.5]}
                        scale={[100, 100, 100]}
                        material={grass_B.materials.tiny_treats_1}
                    />
                </group>
            </RigidBody>
        </group>
    );
});

models.forEach((model) => {
    useGLTF.preload(model);
});
