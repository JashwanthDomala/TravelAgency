import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 400 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }

    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.02}
        color="#0A7C6E"
        transparent
        opacity={0.85}
      />
    </points>
  );
}

export default function IndiaGlobe({
  mouse,
  scrollProgress,
}) {
  const globeRef = useRef();
  const glowRef = useRef();

  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    const scroll =
      scrollProgress?.current ?? 0;

    // Globe animation
    if (globeRef.current) {
      // Auto rotate
      globeRef.current.rotation.y = t * 0.08;

      // Small vertical tilt only
      globeRef.current.rotation.x =
        (mouse?.current?.y || 0) * 0.08;

      // Scale only globe
      const scale = 1 - scroll * 0.5;

      globeRef.current.scale.setScalar(scale);

      // Keep perfectly centered
      globeRef.current.position.set(0, 0, 0);
    }

    // Particle rotation
    if (glowRef.current) {
      glowRef.current.rotation.y =
        -t * 0.05;
    }

    // Fixed camera
    camera.position.set(0, 0, 4.5);

    camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      {/* Lights */}
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={1.1}
        color="#0A7C6E"
      />

      <pointLight
        position={[-4, 2, 4]}
        intensity={0.7}
        color="#F59E0B"
      />

      {/* Stars */}
      <Stars
        radius={80}
        depth={40}
        count={2000}
        factor={3}
        fade
        speed={0.5}
      />

      {/* Globe */}
      <group ref={globeRef}>
        <Sphere args={[1.4, 64, 64]}>
          <meshStandardMaterial
            color="#0A7C6E"
            emissive="#0A7C6E"
            emissiveIntensity={0.2}
            roughness={0.45}
            metalness={0.25}
          />
        </Sphere>

        {/* Wireframe glow */}
        <Sphere args={[1.42, 32, 32]}>
          <meshBasicMaterial
            color="#F59E0B"
            transparent
            opacity={0.1}
            wireframe
          />
        </Sphere>
      </group>

      {/* Floating particles */}
      <group ref={glowRef}>
        <Particles />
      </group>

      {/* Ring */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
      >
        <ringGeometry args={[2.5, 3.2, 64]} />

        <meshBasicMaterial
          color="#FF6B35"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}