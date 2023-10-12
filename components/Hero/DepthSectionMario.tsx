import React from 'react'
import { Suspense, useRef } from 'react'
import { DepthSection, getCameraAimPos } from 'depth-section'
import RPlaceModel from './RPlace'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RPlaceInner = () => {
  const rPlaceRef = useRef<THREE.Group>(null)

  useFrame((threeState) => {
    getCameraAimPos(threeState)
    const rPlaceMesh = rPlaceRef.current

    if (!rPlaceMesh) return

    let [x, y] = getCameraAimPos(threeState)

    rPlaceMesh.position.y = y
    rPlaceMesh.position.x = x
  })

  return (
    <>
      <Suspense fallback={null}>
        <group ref={rPlaceRef}>
          <RPlaceModel />
        </group>
      </Suspense>
    </>
  )
}

type DepthSectionMarioProps = {
  children?: React.ReactNode
  debug?: boolean
}

export const DepthSectionMario = (props: DepthSectionMarioProps) => {
  return (
    <DepthSection
      htmlOverlay={props.children}
      debug={props.debug}
      // TODO: Fix the depth-section prop type to get rid of this `any`.
      canvasProps={
        {
          shadows: true,
          camera: {
            near: 0.1,
            far: 10,
            fov: 120,
          },
        } as any
      }
    >
      <RPlaceInner />
      <ambientLight intensity={0.5} />
      <spotLight position={[4, 2.5, 2.5]} intensity={1.5} angle={2} />
    </DepthSection>
  )
}
