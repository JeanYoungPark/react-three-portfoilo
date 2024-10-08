import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React from "react";

export const Floor = () => {
    const floor_grass_sliced_A = useGLTF("./models/pack/Floor Grass Sliced A.glb");
    const floor_grass_sliced_B = useGLTF("./models/pack/Floor Grass Sliced B-.glb");
    const floor_grass_sliced_C = useGLTF("./models/pack/Floor Grass Sliced C.glb");
    const floor_grass_sliced_D = useGLTF("./models/pack/Floor Grass Sliced D.glb");
    const floor_grass_sliced_E = useGLTF("./models/pack/Floor Grass Sliced E.glb");
    const floor_grass_sliced_F = useGLTF("./models/pack/Floor Grass Sliced F.glb");
    const floor_grass_sliced_G = useGLTF("./models/pack/Floor Grass Sliced G.glb");
    const floor_grass_sliced_H = useGLTF("./models/pack/Floor Grass Sliced H.glb");
    const floor_grass_sliced_I = useGLTF("./models/pack/Floor Grass Sliced I.glb");

    const bench = useGLTF("./models/pack/Bench.glb");
    // const bird = useGLTF("./models/pack/Bird.glb");

    // const bush = useGLTF("./models/pack/Bush.glb");
    // const busg = useGLTF("./models/pack/Bush.glb");

    const grass_A = useGLTF("./models/pack/Grass A.glb");
    const grass_B = useGLTF("./models/pack/Grass B.glb");

    const chk = useGLTF("./models/pack/Chicken.glb");

    console.log(chk);
    return (
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
                    geometry={floor_grass_sliced_C.nodes.floor_grass_sliced_C.geometry}
                    position={[8, 0, 0]}
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
                    geometry={floor_grass_sliced_F.nodes.floor_grass_sliced_F.geometry}
                    position={[8, 0, 2]}
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
                    geometry={floor_grass_sliced_F.nodes.floor_grass_sliced_F.geometry}
                    position={[8, 0, 4]}
                    scale={[100, 100, 100]}
                    material={floor_grass_sliced_F.materials.tiny_treats_grass}
                />

                <mesh
                    geometry={floor_grass_sliced_G.nodes.floor_grass_sliced_G.geometry}
                    position={[0, 0, 6]}
                    scale={[100, 100, 100]}
                    material={floor_grass_sliced_G.materials.tiny_treats_grass}
                />
                <mesh
                    geometry={floor_grass_sliced_H.nodes.floor_grass_sliced_H.geometry}
                    position={[2, 0, 6]}
                    scale={[100, 100, 100]}
                    material={floor_grass_sliced_H.materials.tiny_treats_grass}
                />
                <mesh
                    geometry={floor_grass_sliced_H.nodes.floor_grass_sliced_H.geometry}
                    position={[4, 0, 6]}
                    scale={[100, 100, 100]}
                    material={floor_grass_sliced_H.materials.tiny_treats_grass}
                />
                <mesh
                    geometry={floor_grass_sliced_H.nodes.floor_grass_sliced_H.geometry}
                    position={[6, 0, 6]}
                    scale={[100, 100, 100]}
                    material={floor_grass_sliced_H.materials.tiny_treats_grass}
                />
                <mesh
                    geometry={floor_grass_sliced_I.nodes.floor_grass_sliced_I.geometry}
                    position={[8, 0, 6]}
                    scale={[100, 100, 100]}
                    material={floor_grass_sliced_I.materials.tiny_treats_grass}
                />
            </group>

            <mesh geometry={bench.nodes.bench.geometry} position={[2, 0, 1]} scale={[100, 100, 100]} material={bench.materials.tiny_treats_1} />

            <mesh geometry={grass_A.nodes.grass_A.geometry} position={[6, 0, 2]} scale={[100, 100, 100]} material={grass_A.materials.tiny_treats_1} />
            <mesh
                geometry={chk.nodes.Chicken.geometry}
                position={[6, 0, 2]}
                scale={[100, 100, 100]}
                material={chk.materials.AtlasMaterial}
                animations='Idle'
            />
        </RigidBody>
    );
};
