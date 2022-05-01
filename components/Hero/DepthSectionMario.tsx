import { Suspense, useRef } from 'react'
import { DepthSection, getCameraAimPos } from 'depth-section'
import RPlaceModel from './RPlaceMario'
import { useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

const RPlaceInner = () => {
  const rPlaceRef = useRef<THREE.Group>(null)

  useFrame((threeState) => {
    getCameraAimPos(threeState)
    const rPlaceMesh = rPlaceRef.current

    if (!rPlaceMesh) return

    let [x, y] = getCameraAimPos(threeState)

    x += threeState.mouse.x / 7
    y += threeState.mouse.y / 7

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
      <Suspense fallback={null}>
        <Environment preset='apartment' />
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
      canvasClassName='darken-bg'
    >
      <RPlaceInner />
    </DepthSection>
  )
}
