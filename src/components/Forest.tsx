import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Forest() {
    const { scene, animations } = useGLTF("./models/forest/scene.gltf");
    const group = useRef();

    return (
        <group scale={[12, 12, 12]}>
            <RigidBody type='fixed' colliders='trimesh'>
                <primitive object={scene} ref={group} />
            </RigidBody>
        </group>
        // <group {...props} dispose={null}>
        //     <group rotation={[-Math.PI / 2, 0, 0]} scale={1.419}>
        //         <group rotation={[Math.PI / 2, 0, 0]}>
        //             <group position={[-2.32, 0.017, 5.432]} rotation={[0, -0.532, 0]} scale={0.161}>
        //                 <mesh geometry={nodes.Object_52.geometry} material={materials.Props_1} />
        //                 <mesh
        //                     geometry={nodes.Object_54.geometry}
        //                     material={materials.Props_1}
        //                     position={[0, 2.11, 0.897]}
        //                     rotation={[0.471, 0.351, 0.071]}
        //                     scale={7.95}
        //                 />
        //                 <mesh
        //                     geometry={nodes.Object_56.geometry}
        //                     material={materials.Props_1}
        //                     position={[0.69, 2.267, -0.527]}
        //                     rotation={[-0.668, -0.51, -0.31]}
        //                     scale={8.105}
        //                 />
        //                 <mesh
        //                     geometry={nodes.Object_58.geometry}
        //                     material={materials.Props_1}
        //                     position={[0, 2.229, -0.686]}
        //                     rotation={[-0.231, -0.041, -0.027]}
        //                     scale={6.218}
        //                 />
        //                 <mesh
        //                     geometry={nodes.Object_60.geometry}
        //                     material={materials.Props_1}
        //                     position={[1.432, 0.168, -2.963]}
        //                     rotation={[0.741, -0.641, 1.885]}
        //                     scale={8.105}
        //                 />
        //                 <mesh
        //                     geometry={nodes.Object_62.geometry}
        //                     material={materials.Props_1}
        //                     position={[-0.638, 2.245, -0.472]}
        //                     rotation={[2.623, 0.745, 2.875]}
        //                     scale={7.95}
        //                 />
        //             </group>
        //             <mesh geometry={nodes.Object_4.geometry} material={materials.Material} position={[2.399, 0.806, 1.403]} scale={1.3} />
        //             <mesh geometry={nodes.Object_6.geometry} material={materials.Rocks} position={[-1.264, 0, -4.823]} />
        //             <mesh
        //                 geometry={nodes.Object_8.geometry}
        //                 material={materials.Branches}
        //                 position={[2.399, 0.206, 1.403]}
        //                 rotation={[0, 0.374, 0]}
        //                 scale={[1.285, 2.077, 1.285]}
        //             />
        //             <mesh geometry={nodes.Object_10.geometry} material={materials.Ground} position={[2.399, -0.014, 1.403]} />
        //             <mesh
        //                 geometry={nodes.Object_12.geometry}
        //                 material={materials.Clouds}
        //                 position={[2.399, 11.672, 1.403]}
        //                 rotation={[0, 0.984, 0]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_14.geometry}
        //                 material={materials.Bushes}
        //                 position={[8.277, 0.018, 2.528]}
        //                 rotation={[0, -0.722, -Math.PI / 2]}
        //                 scale={1.172}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_16.geometry}
        //                 material={materials.Foliage}
        //                 position={[-1.623, -0.014, 14.956]}
        //                 rotation={[-0.216, -1.078, -0.252]}
        //                 scale={1.049}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_18.geometry}
        //                 material={materials.Logs}
        //                 position={[-4.103, 0.158, -4.117]}
        //                 rotation={[Math.PI / 2, 0, 2.694]}
        //                 scale={1.356}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_20.geometry}
        //                 material={materials.Logs}
        //                 position={[-4.353, 0.182, -3.969]}
        //                 rotation={[1.553, -0.037, 2.693]}
        //                 scale={1.356}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_22.geometry}
        //                 material={materials.Logs}
        //                 position={[-4.629, 0.158, -3.865]}
        //                 rotation={[1.387, -0.363, 2.66]}
        //                 scale={1.356}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_24.geometry}
        //                 material={materials.Logs}
        //                 position={[-4.226, 0.403, -4.059]}
        //                 rotation={[Math.PI / 2, 0, 2.694]}
        //                 scale={[1.123, 1.304, 1.123]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_26.geometry}
        //                 material={materials.Logs}
        //                 position={[-4.505, 0.379, -3.924]}
        //                 rotation={[-2.215, 0.896, 0.766]}
        //                 scale={[0.951, 1.047, 0.951]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_28.geometry}
        //                 material={materials.Logs}
        //                 position={[-4.878, 0.182, -3.717]}
        //                 rotation={[1.553, -0.037, 2.693]}
        //                 scale={1.356}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_30.geometry}
        //                 material={materials.Logs}
        //                 position={[-4.744, 0.35, -3.781]}
        //                 rotation={[1.406, -0.329, 2.666]}
        //                 scale={[0.812, 1.198, 0.812]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_32.geometry}
        //                 material={materials.Logs}
        //                 position={[-5.141, 0.163, -3.618]}
        //                 rotation={[1.313, -0.487, 2.629]}
        //                 scale={[1.123, 1.304, 1.123]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_34.geometry}
        //                 material={materials.Logs}
        //                 position={[-5.094, 0.368, -3.795]}
        //                 rotation={[-2.277, 0.933, 0.815]}
        //                 scale={[0.883, 0.972, 0.883]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_36.geometry}
        //                 material={materials.Logs}
        //                 position={[-5.203, 0.242, -2.781]}
        //                 rotation={[3.138, -0.699, -0.654]}
        //                 scale={[0.772, 0.85, 0.772]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_38.geometry}
        //                 material={materials.Logs}
        //                 position={[-4.57, 0.142, -4.526]}
        //                 rotation={[0.845, 0.309, 2.812]}
        //                 scale={[0.268, 0.721, 0.268]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_40.geometry}
        //                 material={materials.Tree}
        //                 position={[-3.975, -0.843, 7.177]}
        //                 rotation={[-Math.PI, 0.489, -Math.PI]}
        //                 scale={0.847}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_42.geometry}
        //                 material={materials.Bushes}
        //                 position={[8.846, 0.044, 8.146]}
        //                 rotation={[-Math.PI, 0, 0]}
        //                 scale={[-0.031, 0.031, 0.031]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_44.geometry}
        //                 material={materials.Bushes}
        //                 position={[6.617, 0.06, -5.022]}
        //                 rotation={[-Math.PI, 0, 0]}
        //                 scale={[-0.035, 0.035, 0.035]}
        //             />
        //             <mesh geometry={nodes.Object_46.geometry} material={materials.Bushes} position={[-4.748, 5.118, 6.479]} />
        //             <mesh
        //                 geometry={nodes.Object_48.geometry}
        //                 material={materials.Dryer}
        //                 position={[2.998, 1.184, -6.005]}
        //                 rotation={[-Math.PI, -0.645, -Math.PI]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_50.geometry}
        //                 material={materials.Props_1}
        //                 position={[-2.076, 0.191, 4.184]}
        //                 rotation={[0.035, -0.074, -0.19]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_64.geometry}
        //                 material={materials.Props_1}
        //                 position={[-3.389, 0.142, 4.472]}
        //                 rotation={[Math.PI, -1.388, Math.PI]}
        //                 scale={1.15}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_66.geometry}
        //                 material={materials.Stump}
        //                 position={[-5.603, 0.114, -2.452]}
        //                 rotation={[-Math.PI, 1.493, Math.PI]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_68.geometry}
        //                 material={materials.Logs}
        //                 position={[-5.503, 0.769, -2.487]}
        //                 rotation={[Math.PI / 2, -0.487, 0.914]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_70.geometry}
        //                 material={materials.Bushes}
        //                 position={[-5.964, 0.044, 1.386]}
        //                 rotation={[-Math.PI, 0, 0]}
        //                 scale={[-0.031, 0.031, 0.031]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_72.geometry}
        //                 material={materials.Bushes}
        //                 position={[6.389, 0.044, 6.171]}
        //                 rotation={[-Math.PI, 0, 0]}
        //                 scale={[-0.031, 0.031, 0.031]}
        //             />
        //             <mesh geometry={nodes.Object_74.geometry} material={materials.Dirt} position={[-3.127, -0.436, 3.537]} scale={[1, 1.294, 1]} />
        //             <mesh geometry={nodes.Object_76.geometry} material={materials.Lamp} position={[5.358, -0.062, 5.954]} scale={1.431} />
        //             <mesh geometry={nodes.Object_78.geometry} material={materials.Lamp} position={[3.928, 0.41, 5.902]} />
        //             <mesh
        //                 geometry={nodes.Object_80.geometry}
        //                 material={materials.Lamp}
        //                 position={[5.405, 0.41, 7.252]}
        //                 rotation={[0, -Math.PI / 2, 0]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_82.geometry}
        //                 material={materials.Rocks}
        //                 position={[7.561, -0.086, 9.27]}
        //                 rotation={[-Math.PI, 0, -Math.PI]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_84.geometry}
        //                 material={materials.Rocks}
        //                 position={[7.854, -0.086, 2.745]}
        //                 rotation={[0, -Math.PI / 2, 0]}
        //             />
        //             <mesh geometry={nodes.Object_86.geometry} material={materials.Rocks} position={[7.863, -0.086, 2.443]} />
        //             <mesh geometry={nodes.Object_88.geometry} material={materials.Rocks} position={[7.863, -0.086, -1.523]} />
        //             <mesh
        //                 geometry={nodes.Object_90.geometry}
        //                 material={materials.Rocks}
        //                 position={[7.869, -0.086, 5.022]}
        //                 rotation={[0, -Math.PI / 2, 0]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_92.geometry}
        //                 material={materials.Rocks}
        //                 position={[7.854, -0.086, -1.825]}
        //                 rotation={[0, Math.PI / 2, 0]}
        //             />
        //             <mesh geometry={nodes.Object_94.geometry} material={materials.Rocks} position={[7.863, -0.086, -3.8]} />
        //             <mesh geometry={nodes.Object_96.geometry} material={materials.Rocks} position={[7.863, -0.086, 4.72]} />
        //             <mesh geometry={nodes.Object_98.geometry} material={materials.Rocks} position={[5.888, -0.086, -6.074]} />
        //             <mesh geometry={nodes.Object_100.geometry} material={materials.Rocks} position={[7.863, -0.086, -6.079]} />
        //             <mesh
        //                 geometry={nodes.Object_102.geometry}
        //                 material={materials.Rocks}
        //                 position={[7.241, -0.183, -5.772]}
        //                 rotation={[-1.624, -0.383, -1.77]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_104.geometry}
        //                 material={materials.Rocks}
        //                 position={[8.825, -0.377, 7.2]}
        //                 rotation={[0, -0.29, 1.225]}
        //             />
        //             <mesh geometry={nodes.Object_106.geometry} material={materials.Rocks} position={[7.863, -0.086, 9.273]} />
        //             <mesh
        //                 geometry={nodes.Object_108.geometry}
        //                 material={materials.Rocks}
        //                 position={[7.893, -0.086, 8.968]}
        //                 rotation={[-1.186, 1.485, 1.184]}
        //             />
        //             <mesh geometry={nodes.Object_110.geometry} material={materials.Rocks} position={[-2.44, -0.086, 9.273]} />
        //             <mesh geometry={nodes.Object_112.geometry} material={materials.Rocks} position={[-2.139, -0.086, 9.27]} />
        //             <mesh
        //                 geometry={nodes.Object_114.geometry}
        //                 material={materials.Rocks}
        //                 position={[2.491, -0.213, 9.26]}
        //                 rotation={[-0.244, -0.495, -0.118]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_116.geometry}
        //                 material={materials.Rocks}
        //                 position={[6.05, -0.014, 0.885]}
        //                 rotation={[0.02, -0.001, -0.048]}
        //                 scale={1.069}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_118.geometry}
        //                 material={materials.Rocks}
        //                 position={[6.084, -0.016, 0.012]}
        //                 rotation={[0.036, -0.075, 0]}
        //                 scale={0.802}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_120.geometry}
        //                 material={materials.Rocks}
        //                 position={[6.963, -0.057, -0.055]}
        //                 rotation={[-2.605, -1.481, -2.556]}
        //                 scale={0.964}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_122.geometry}
        //                 material={materials.Rocks}
        //                 position={[5.264, -0.016, -0.153]}
        //                 rotation={[0.021, -0.098, 0.016]}
        //                 scale={1.01}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_124.geometry}
        //                 material={materials.Rocks}
        //                 position={[4.261, -0.016, 0.794]}
        //                 rotation={[0.07, 0.1, 0.016]}
        //                 scale={0.841}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_126.geometry}
        //                 material={materials.Rocks}
        //                 position={[9.347, -0.029, 0.885]}
        //                 rotation={[0.02, -0.001, -0.048]}
        //                 scale={1.026}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_128.geometry}
        //                 material={materials.Rocks}
        //                 position={[7.576, -0.064, 0.897]}
        //                 rotation={[-2.736, -1.531, -2.632]}
        //                 scale={1.088}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_130.geometry}
        //                 material={materials.Rocks}
        //                 position={[8.441, -0.016, -0.157]}
        //                 rotation={[0.021, 0.085, 0.012]}
        //                 scale={0.819}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_132.geometry}
        //                 material={materials.Rocks}
        //                 position={[1.741, -0.017, -0.26]}
        //                 rotation={[0.02, -0.037, 0.014]}
        //                 scale={0.821}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_134.geometry}
        //                 material={materials.Rocks}
        //                 position={[1.741, -0.044, 0.676]}
        //                 rotation={[1.779, -1.498, 1.792]}
        //                 scale={1.026}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_136.geometry}
        //                 material={materials.Rocks}
        //                 position={[2.607, -0.035, -0.244]}
        //                 rotation={[-0.236, 1.521, 0.286]}
        //                 scale={0.964}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_138.geometry}
        //                 material={materials.Rocks}
        //                 position={[3.233, -0.016, 6.622]}
        //                 rotation={[0.071, -0.142, 0.034]}
        //                 scale={0.757}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_140.geometry}
        //                 material={materials.Rocks}
        //                 position={[4.016, -0.016, 6.622]}
        //                 rotation={[3.071, 0.019, -3.117]}
        //                 scale={0.841}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_142.geometry}
        //                 material={materials.Rocks}
        //                 position={[4.749, -0.016, 6.622]}
        //                 rotation={[1.29, 1.498, -1.266]}
        //                 scale={0.691}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_144.geometry}
        //                 material={materials.Rocks}
        //                 position={[3.308, 0.007, 7.339]}
        //                 rotation={[0.07, -0.066, 0.028]}
        //                 scale={0.723}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_146.geometry}
        //                 material={materials.Rocks}
        //                 position={[4.082, -0.04, 7.467]}
        //                 rotation={[3.029, 0.223, 3.062]}
        //                 scale={0.841}
        //             />
        //             <mesh geometry={nodes.Object_148.geometry} material={materials.House} rotation={[Math.PI, 0, Math.PI / 2]} scale={0.52} />
        //             <mesh
        //                 geometry={nodes.Object_150.geometry}
        //                 material={materials.Doors}
        //                 position={[1.248, 3.125, 0.725]}
        //                 rotation={[0.026, 0, -0.069]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_152.geometry}
        //                 material={materials.Doors}
        //                 position={[-1.026, 3.139, 0.852]}
        //                 rotation={[-3.106, 0, 3.072]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_154.geometry}
        //                 material={materials.Doors}
        //                 position={[-1.026, 3.154, -0.321]}
        //                 rotation={[3.102, 0, 3.072]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_156.geometry}
        //                 material={materials.Doors}
        //                 position={[1.812, 5.345, 0.291]}
        //                 rotation={[0.598, 0, -Math.PI / 2]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_158.geometry}
        //                 material={materials.Doors}
        //                 position={[-1.317, 5.345, 0.291]}
        //                 rotation={[2.682, 0, Math.PI / 2]}
        //             />
        //             <mesh geometry={nodes.Object_160.geometry} material={materials.Doors} position={[1.109, 0.688, 0.13]} rotation={[0, 0, -0.024]} />
        //             <mesh
        //                 geometry={nodes.Object_162.geometry}
        //                 material={materials.Doors}
        //                 position={[1.248, 3.125, -0.306]}
        //                 rotation={[-0.011, 0, -0.069]}
        //             />
        //             <mesh
        //                 geometry={nodes.Object_164.geometry}
        //                 material={materials.Doors}
        //                 position={[-0.897, 1.205, 0.209]}
        //                 rotation={[3.135, 0, 3.072]}
        //             />
        //         </group>
        //     </group>
        // </group>
    );
}

useGLTF.preload("./models/forest/scene.gltf");
