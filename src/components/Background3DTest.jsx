import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Center, Text3D } from "@react-three/drei";
import { useMemo, useRef } from "react";
import helvetikerBold from "three/examples/fonts/helvetiker_bold.typeface.json?url";

function BalloonLetter({
  letter,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = 1,
  speed = 0.2,
}) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.elapsedTime;

    group.current.rotation.y = rotation[1] + Math.sin(t * speed) * 0.35;
    group.current.rotation.x = rotation[0] + Math.cos(t * speed * 0.8) * 0.12;
    group.current.rotation.z = rotation[2] + Math.sin(t * speed * 0.6) * 0.08;

    group.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 0.25;
    group.current.position.x = position[0] + Math.cos(t * speed * 0.5 + position[1]) * 0.12;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.35}>
      <group ref={group} position={position} rotation={rotation} scale={size}>
        <Center>
          <Text3D
            font={helvetikerBold}
            size={1}
            height={0.55}
            curveSegments={18}
            bevelEnabled
            bevelThickness={0.09}
            bevelSize={0.08}
            bevelOffset={0}
            bevelSegments={12}
          >
            {letter}
            <meshPhysicalMaterial
              metalness={1}
              roughness={0.08}
              clearcoat={1}
              clearcoatRoughness={0.06}
              reflectivity={1}
              envMapIntensity={3}
              iridescence={1}
              iridescenceIOR={1.3}
              iridescenceThicknessRange={[100, 700]}
              sheen={1}
              sheenRoughness={0.2}
              transmission={0.02}
              thickness={0.8}
              color="#cfd6ff"
              emissive="#3e54ff"
              emissiveIntensity={0.08}
            />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
}

function Scene() {
  const { viewport } = useThree();

  const letters = useMemo(() => {
    const base = Math.min(viewport.width, viewport.height);

    return [
      {
        letter: "L",
        position: [-viewport.width * 0.32, viewport.height * 0.18, -1.5],
        rotation: [-0.2, 0.45, -0.12],
        size: base * 0.42,
        speed: 0.32,
      },
      {
        letter: "S",
        position: [0, -viewport.height * 0.02, -2],
        rotation: [0.12, -0.3, 0.08],
        size: base * 0.5,
        speed: 0.24,
      },
      {
        letter: "T",
        position: [viewport.width * 0.34, -viewport.height * 0.2, -1.2],
        rotation: [0.18, 0.38, 0.1],
        size: base * 0.42,
        speed: 0.29,
      },
    ];
  }, [viewport]);

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 6, 8]} intensity={2.2} color="#b7c5ff" />
      <directionalLight position={[-6, -4, 4]} intensity={1.7} color="#8f72ff" />
      <pointLight position={[0, 0, 6]} intensity={1.2} color="#ffffff" />
      <Environment preset="city" />

      {letters.map((item, i) => (
        <BalloonLetter key={i} {...item} />
      ))}
    </>
  );
}

export default function Background3D() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 35%, rgba(25,35,95,0.28) 0%, rgba(8,10,22,0.75) 45%, rgba(3,4,10,1) 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}