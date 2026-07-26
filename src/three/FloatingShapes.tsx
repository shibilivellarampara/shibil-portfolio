import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

type ShapeConfig = {
  position: [number, number, number];
  scale: number;
  geometry: "sphere" | "torus" | "box" | "icosahedron" | "octahedron";
  speed: number;
};

const shapeConfigs: ShapeConfig[] = [
  { position: [-2.6, 1.4, -1.5], scale: 0.7, geometry: "icosahedron", speed: 0.4 },
  { position: [2.7, -0.9, -1], scale: 0.8, geometry: "torus", speed: 0.35 },
  { position: [1.0, 1.9, -1.8], scale: 0.5, geometry: "octahedron", speed: 0.5 },
  { position: [2.6, -1.9, -1.2], scale: 0.42, geometry: "box", speed: 0.45 },
  { position: [3.8, 0.7, -2.4], scale: 0.4, geometry: "sphere", speed: 0.3 },
];

function Shape({ position, scale, geometry, speed }: ShapeConfig) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.05 * speed;
    ref.current.rotation.y += delta * 0.08 * speed;
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case "torus":
        return <torusGeometry args={[0.6, 0.2, 16, 48]} />;
      case "box":
        return <boxGeometry args={[0.9, 0.9, 0.9]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.8, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.8, 0]} />;
      default:
        return <sphereGeometry args={[0.7, 24, 24]} />;
    }
  }, [geometry]);

  return (
    <Float speed={speed} rotationIntensity={0.15} floatIntensity={0.5}>
      <mesh ref={ref} position={position} scale={scale}>
        {geo}
        <meshBasicMaterial color="#5b9dd9" wireframe transparent opacity={0.35} />
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
      {shapeConfigs.map((cfg, i) => (
        <Shape key={i} {...cfg} />
      ))}
    </Canvas>
  );
}
