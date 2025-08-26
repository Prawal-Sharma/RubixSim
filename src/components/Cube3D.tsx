import { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'
import * as THREE from 'three'
import { CubeState, Face } from '../types/cube'
import { COLOR_HEX } from '../utils/cubeUtils'

interface CubieProps {
  position: [number, number, number]
  colors: { [key in Face]?: string }
}

function Cubie({ position, colors }: CubieProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const materials = [
    new THREE.MeshStandardMaterial({ color: colors.R || '#000000' }), // Right
    new THREE.MeshStandardMaterial({ color: colors.L || '#000000' }), // Left
    new THREE.MeshStandardMaterial({ color: colors.U || '#000000' }), // Up
    new THREE.MeshStandardMaterial({ color: colors.D || '#000000' }), // Down
    new THREE.MeshStandardMaterial({ color: colors.F || '#000000' }), // Front
    new THREE.MeshStandardMaterial({ color: colors.B || '#000000' }), // Back
  ]
  
  return (
    <Box
      ref={meshRef}
      position={position}
      args={[0.9, 0.9, 0.9]}
      material={materials}
    />
  )
}

interface Cube3DProps {
  cubeState: CubeState
  isRotating?: boolean
}

export default function Cube3D({ cubeState, isRotating }: Cube3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [rotation, setRotation] = useState(0)
  
  useEffect(() => {
    if (isRotating && groupRef.current) {
      const interval = setInterval(() => {
        setRotation(r => r + 0.01)
      }, 16)
      return () => clearInterval(interval)
    }
  }, [isRotating])
  
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation
    }
  }, [rotation])
  
  const getCubieColors = (x: number, y: number, z: number) => {
    const colors: { [key in Face]?: string } = {}
    
    // Map cube state to 3D positions
    if (x === 1) colors.R = COLOR_HEX[cubeState.faces.R[1 - y][z + 1]]
    if (x === -1) colors.L = COLOR_HEX[cubeState.faces.L[1 - y][1 - z]]
    if (y === 1) colors.U = COLOR_HEX[cubeState.faces.U[1 - z][x + 1]]
    if (y === -1) colors.D = COLOR_HEX[cubeState.faces.D[z + 1][x + 1]]
    if (z === 1) colors.F = COLOR_HEX[cubeState.faces.F[1 - y][x + 1]]
    if (z === -1) colors.B = COLOR_HEX[cubeState.faces.B[1 - y][1 - x]]
    
    return colors
  }
  
  const cubies = []
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (x === 0 && y === 0 && z === 0) continue // Skip center
        cubies.push(
          <Cubie
            key={`${x}-${y}-${z}`}
            position={[x, y, z]}
            colors={getCubieColors(x, y, z)}
          />
        )
      }
    }
  }
  
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <group ref={groupRef}>
        {cubies}
      </group>
      <OrbitControls enablePan={false} />
    </Canvas>
  )
}