import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const CUBE_SIZE = 1;
const PANEL_SIZE = 0.95;
const GAP = 0.02;

interface PanelProps {
  position: [number, number, number];
  color: string;
}

const Panel: React.FC<PanelProps> = ({ position, color }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[PANEL_SIZE, PANEL_SIZE, 0.01]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.3}
        emissive={color === "#ffffff" ? "#ffffff" : "#000000"}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const CubeFace: React.FC<{ axis: "x" | "y" | "z"; direction: 1 | -1 }> = ({
  axis,
  direction,
}) => {
  const positions: [number, number, number][] = [];
  const baseCoord = (CUBE_SIZE - PANEL_SIZE - GAP) / 2;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let x = 0,
        y = 0,
        z = 0;
      if (axis === "x") {
        x = (CUBE_SIZE / 2 + 0.005) * direction;
        y = i * (PANEL_SIZE + GAP);
        z = j * (PANEL_SIZE + GAP);
      } else if (axis === "y") {
        y = (CUBE_SIZE / 2 + 0.005) * direction;
        x = i * (PANEL_SIZE + GAP);
        z = j * (PANEL_SIZE + GAP);
      } else {
        z = (CUBE_SIZE / 2 + 0.005) * direction;
        x = i * (PANEL_SIZE + GAP);
        y = j * (PANEL_SIZE + GAP);
      }
      positions.push([x, y, z]);
    }
  }

  return (
    <>
      {positions.map((pos, idx) => (
        <Panel
          key={`${axis}-${direction}-${idx}`}
          position={pos}
          color={idx === 4 ? "#ffffff" : "#000000"}
        />
      ))}
    </>
  );
};

const RotatingCube: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [solved, setSolved] = useState(false);
  const initialRotation = useRef<[number, number, number]>([
    Math.PI / 6,
    Math.PI / 4,
    Math.PI / 12,
  ]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (!solved) {
      // Smooth transition to solved state
      const target = new THREE.Euler(0, 0, 0);
      groupRef.current.rotation.x +=
        (target.x - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y +=
        (target.y - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.z +=
        (target.z - groupRef.current.rotation.z) * 0.05;

      if (
        Math.abs(groupRef.current.rotation.x) < 0.01 &&
        Math.abs(groupRef.current.rotation.y) < 0.01 &&
        Math.abs(groupRef.current.rotation.z) < 0.01
      ) {
        groupRef.current.rotation.set(0, 0, 0);
        setSolved(true);
      }
    } else {
      // Idle rotation with subtle movement
      groupRef.current.rotation.x += delta * 0.05;
      groupRef.current.rotation.y += delta * 0.07;
    }
  });

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.set(
        initialRotation.current[0],
        initialRotation.current[1],
        initialRotation.current[2]
      );
    }
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main cube structure */}
      <group>
        {/* Face panels */}
        <CubeFace axis="x" direction={1} />
        <CubeFace axis="x" direction={-1} />
        <CubeFace axis="y" direction={1} />
        <CubeFace axis="y" direction={-1} />
        <CubeFace axis="z" direction={1} />
        <CubeFace axis="z" direction={-1} />
      </group>
    </group>
  );
};

const CinematicCube: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <pointLight position={[0, 0, 5]} intensity={0.4} />
        <RotatingCube />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          dampingFactor={0.1}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default CinematicCube;
