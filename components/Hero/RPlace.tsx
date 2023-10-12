/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, JSX } from 'react'
import { useGLTF } from '@react-three/drei'

type GLTFResult = ReturnType<typeof useGLTF> & { [key: string]: any }

export default function Model({ ...props }: JSX.IntrinsicElements['group']) {
  const group =
    useRef<THREE.Group>() as React.MutableRefObject<THREE.Group | null>
  const { nodes, materials } = useGLTF('/r-place.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.rPlaceGrid.geometry}
        material={materials.ColorMap}
        scale={[600, 100, 600]}
        position={[0, 0, -2]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/r-place.glb')
