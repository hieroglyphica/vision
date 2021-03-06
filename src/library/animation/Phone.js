/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/phone.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    console.log(actions);
    actions.Talking.play();
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group
        rotation={[Math.PI / 1.7, 0, 0]}
        scale={0.03}
        position={[0, -3.14, 0]}
      >
        <primitive object={nodes.mixamorig8Hips} />
        <skinnedMesh
          geometry={nodes.Ch07_Body.geometry}
          material={nodes.Ch07_Body.material}
          skeleton={nodes.Ch07_Body.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ch07_Eyelashes.geometry}
          material={nodes.Ch07_Eyelashes.material}
          skeleton={nodes.Ch07_Eyelashes.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ch07_Hair.geometry}
          material={nodes.Ch07_Hair.material}
          skeleton={nodes.Ch07_Hair.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ch07_Heels.geometry}
          material={nodes.Ch07_Heels.material}
          skeleton={nodes.Ch07_Heels.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ch07_Pants.geometry}
          material={nodes.Ch07_Pants.material}
          skeleton={nodes.Ch07_Pants.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ch07_Shirt.geometry}
          material={nodes.Ch07_Shirt.material}
          skeleton={nodes.Ch07_Shirt.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ch07_Suit.geometry}
          material={nodes.Ch07_Suit.material}
          skeleton={nodes.Ch07_Suit.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/phone.glb");
