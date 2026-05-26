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
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#306D29" transparent opacity={0.85} />
    </points>
  );
}

export default function IndiaGlobe({ mouse, scrollProgress }) {
  const globeRef = useRef();
  const glowRef = useRef();
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollProgress?.current ?? 0;

    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.08 + (mouse?.current?.x || 0) * 0.35;
      globeRef.current.rotation.x = (mouse?.current?.y || 0) * 0.18;
      const scale = 1 - scroll * 0.35;
      globeRef.current.scale.setScalar(scale);
      globeRef.current.position.y = scroll * -0.8;
    }

    if (glowRef.current) {
      glowRef.current.rotation.y = -t * 0.05;
    }

    camera.position.z = 4.5 + scroll * 2.2;
    camera.position.y = scroll * 0.4;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} color="#306D29" />
      <pointLight position={[-4, 2, 4]} intensity={0.7} color="#0D530E" />

      <Stars radius={80} depth={40} count={2000} factor={3} fade speed={0.5} />

      <group ref={globeRef}>
        <Sphere args={[1.4, 64, 64]}>
          <meshStandardMaterial
            color="#0D530E"
            emissive="#306D29"
            emissiveIntensity={0.2}
            roughness={0.45}
            metalness={0.25}
          />
        </Sphere>
        <Sphere args={[1.42, 32, 32]}>
          <meshBasicMaterial color="#306D29" transparent opacity={0.1} wireframe />
        </Sphere>
      </group>

      <group ref={glowRef}>
        <Particles />
      </group>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <ringGeometry args={[2.5, 3.2, 64]} />
        <meshBasicMaterial color="#306D29" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
