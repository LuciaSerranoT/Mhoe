import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";

function FloatingOrb({ position, scale, color }) {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.1;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.15;
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <Sphere ref={mesh} args={[0.8, 32, 32]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          metalness={0.3}
          roughness={0.4}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          envMapIntensity={0.8}
          distort={0.2}
          speed={1}
          transparent
          opacity={0.7}
        />
      </Sphere>
    </Float>
  );
}

export default function Background3D() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%)",
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ opacity: 0.4 }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#667eea" />
        <directionalLight position={[-5, -3, 2]} intensity={0.6} color="#764ba2" />
        <Environment preset="dawn" />

        <FloatingOrb position={[-4, 2, -2]} scale={0.6} color="#667eea" />
        <FloatingOrb position={[4, -1, -3]} scale={0.8} color="#764ba2" />
        <FloatingOrb position={[0, 3, -1]} scale={0.5} color="#4facfe" />
        <FloatingOrb position={[-2, -2, -4]} scale={0.7} color="#00f2fe" />
        <FloatingOrb position={[3, 1, -2]} scale={0.6} color="#f093fb" />
      </Canvas>
    </div>
  );
}