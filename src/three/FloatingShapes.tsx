import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

type ShapeConfig = {
  position: [number, number, number];
  scale: number;
  color: string;
  geometry: "sphere" | "torus" | "box" | "icosahedron";
  speed: number;
};

const shapeConfigs: ShapeConfig[] = [
  { position: [-2.6, 1.4, -1.5], scale: 0.65, color: "#a99bf0", geometry: "icosahedron", speed: 1.1 },
  { position: [2.7, -0.9, -1], scale: 0.75, color: "#f0b990", geometry: "torus", speed: 0.9 },
  { position: [1.0, 1.9, -1.5], scale: 0.55, color: "#8fd6c4", geometry: "sphere", speed: 1.4 },
  { position: [2.5, -1.9, -1], scale: 0.4, color: "#f0a7c4", geometry: "box", speed: 1.2 },
  { position: [3.7, 0.7, -2.2], scale: 0.4, color: "#6d5bd0", geometry: "sphere", speed: 0.8 },
];

function Shape({ position, scale, color, geometry, speed }: ShapeConfig) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.12 * speed;
    ref.current.rotation.y += delta * 0.18 * speed;
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case "torus":
        return <torusGeometry args={[0.6, 0.22, 32, 64]} />;
      case "box":
        return <boxGeometry args={[0.9, 0.9, 0.9]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.8, 0]} />;
      default:
        return <sphereGeometry args={[0.7, 48, 48]} />;
    }
  }, [geometry]);

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        {geo}
        <MeshDistortMaterial
          color={color}
          distort={0.25}
          speed={1.5}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingShapes() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={0.8} />
      <directionalLight position={[-3, -2, -4]} intensity={0.3} />
      {shapeConfigs.map((cfg, i) => (
        <Shape key={i} {...cfg} />
      ))}
    </Canvas>
  );
}
