import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Environment, Float, Text3D } from "@react-three/drei";
import { useMemo, useRef } from "react";
import helvetikerBold from "three/examples/fonts/helvetiker_bold.typeface.json?url";
import * as THREE from "three";

function getSectionTargets(section, viewport) {
  const base = Math.min(viewport.width, viewport.height);

  const states = {
    hero: {
      L: {
        position: [-viewport.width * 0.34, viewport.height * 0.12, -1.6],
        rotation: [-0.08, 0.4, -0.05],
        scale: base * 0.5,
        visible: true,
      },
      S: {
        position: [0, -viewport.height * 0.02, -2],
        rotation: [0.06, -0.25, 0.03],
        scale: base * 0.58,
        visible: true,
      },
      T: {
        position: [viewport.width * 0.34, -viewport.height * 0.14, -1.5],
        rotation: [0.08, 0.35, 0.04],
        scale: base * 0.5,
        visible: true,
      },
    },

    about: {
      L: {
        position: [-2.8, 0.1, -1.3],
        rotation: [0, 0.25, 0],
        scale: base * 0.62,
        visible: true,
      },
      S: {
        position: [-viewport.width * 0.9, -1.5, -5],
        rotation: [0, 0, 0],
        scale: base * 0.2,
        visible: false,
      },
      T: {
        position: [viewport.width * 0.9, -1.5, -5],
        rotation: [0, 0, 0],
        scale: base * 0.2,
        visible: false,
      },
    },

    skills: {
      L: {
        position: [-viewport.width * 0.1, -0.2, -8],
        rotation: [0.1, 0.8, 0],
        scale: base * 0.22,
        visible: true,
      },
      S: {
        position: [0, 0.15, -9],
        rotation: [0, -0.6, 0],
        scale: base * 0.18,
        visible: true,
      },
      T: {
        position: [viewport.width * 0.12, -0.1, -10],
        rotation: [0.08, 0.65, 0],
        scale: base * 0.18,
        visible: true,
      },
    },

    projects: {
      L: {
        position: [-viewport.width * 0.28, 0.2, -2.8],
        rotation: [0.02, 0.45, 0],
        scale: base * 0.34,
        visible: true,
      },
      S: {
        position: [0.1, -0.15, -3],
        rotation: [0.05, -0.3, 0],
        scale: base * 0.38,
        visible: true,
      },
      T: {
        position: [viewport.width * 0.26, 0.12, -2.9],
        rotation: [0.02, 0.35, 0],
        scale: base * 0.34,
        visible: true,
      },
    },

    contact: {
      L: {
        position: [-viewport.width * 0.22, 0.35, -4.5],
        rotation: [0, 0.3, 0],
        scale: base * 0.24,
        visible: true,
      },
      S: {
        position: [0, 0.1, -5.2],
        rotation: [0, -0.2, 0],
        scale: base * 0.22,
        visible: true,
      },
      T: {
        position: [viewport.width * 0.22, -0.25, -4.8],
        rotation: [0, 0.25, 0],
        scale: base * 0.24,
        visible: true,
      },
    },

    footer: {
      L: {
        position: [-viewport.width * 0.2, 0.1, -6],
        rotation: [0, 0.2, 0],
        scale: base * 0.18,
        visible: true,
      },
      S: {
        position: [0, 0, -6.5],
        rotation: [0, -0.15, 0],
        scale: base * 0.16,
        visible: true,
      },
      T: {
        position: [viewport.width * 0.2, -0.1, -6.2],
        rotation: [0, 0.15, 0],
        scale: base * 0.18,
        visible: true,
      },
    },
  };

  return states[section] || states.hero;
}

function BalloonLetter({
  letter,
  target,
  color = "#dfe7ff",
  emissive = "#7a8cff",
  speed = 0.2,
}) {
  const group = useRef();
  const materialRef = useRef();

  useFrame((state, delta) => {
    if (!group.current || !materialRef.current) return;

    const t = state.clock.elapsedTime;

    const targetPos = new THREE.Vector3(...target.position);
    group.current.position.lerp(targetPos, 0.08);

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      target.rotation[0] + Math.cos(t * speed * 0.8) * 0.03,
      0.08
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      target.rotation[1] + Math.sin(t * speed) * 0.08,
      0.08
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      target.rotation[2] + Math.sin(t * speed * 0.6) * 0.02,
      0.08
    );

    const floatY = target.visible ? Math.sin(t * speed + target.position[0]) * 0.08 : 0;
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      target.position[1] + floatY,
      0.08
    );

    const currentScale = group.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(currentScale, target.scale, 0.08);
    group.current.scale.setScalar(nextScale);

    const targetOpacity = target.visible ? 1 : 0;
    materialRef.current.opacity = THREE.MathUtils.lerp(
      materialRef.current.opacity,
      targetOpacity,
      0.08
    );
  });

  return (
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.15}>
      <group ref={group} position={target.position} rotation={target.rotation} scale={target.scale}>
        <Center>
          <Text3D
            font={helvetikerBold}
            size={1}
            height={0.9}
            curveSegments={90}
            bevelEnabled
            bevelThickness={0.22}
            bevelSize={0.2}
            bevelOffset={0}
            bevelSegments={60}
          >
            {letter}
            <meshPhysicalMaterial
              ref={materialRef}
              transparent
              opacity={1}
              color={color}
              emissive={emissive}
              emissiveIntensity={0.12}
              metalness={0.95}
              roughness={0.08}
              clearcoat={1}
              clearcoatRoughness={0.04}
              reflectivity={1}
              envMapIntensity={3.5}
              iridescence={1}
              iridescenceIOR={1.35}
              iridescenceThicknessRange={[250, 1000]}
              sheen={1}
              sheenRoughness={0.18}
              transmission={0.06}
              thickness={1.8}
            />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
}

function Scene({ activeSection }) {
  const { viewport } = useThree();

  const targets = useMemo(() => {
    return getSectionTargets(activeSection, viewport);
  }, [activeSection, viewport]);

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[6, 6, 8]} intensity={2.6} color="#d7deff" />
      <directionalLight position={[-6, -4, 5]} intensity={1.9} color="#8e7bff" />
      <pointLight position={[0, 2, 6]} intensity={1.8} color="#9fc2ff" />
      <pointLight position={[0, -2, 4]} intensity={1.2} color="#d2d8e8" />
      <Environment preset="city" />

      <BalloonLetter
        letter="L"
        target={targets.L}
        speed={0.22}
        color="#d6ddff"
        emissive="#6d7cff"
      />

      <BalloonLetter
        letter="S"
        target={targets.S}
        speed={0.18}
        color="#cfd8ff"
        emissive="#7a5cff"
      />

      <BalloonLetter
        letter="T"
        target={targets.T}
        speed={0.2}
        color="#dde5f2"
        emissive="#5a8cff"
      />
    </>
  );
}

export default function Background3D({ activeSection }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 35%, rgba(34,40,58,0.12) 0%, rgba(15,18,28,0.22) 45%, rgba(10,11,16,0.38) 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 40 }}
        dpr={[2.2, 3.2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene activeSection={activeSection} />
      </Canvas>
    </div>
  );
}