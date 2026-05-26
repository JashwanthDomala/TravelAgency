import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import IndiaGlobe from "./IndiaGlobe";

export default function HeroScene({ mouseRef, scrollProgress }) {
  const fallback = (
    <div className="absolute inset-0 bg-gradient-to-b from-cream via-peach to-cream" />
  );

  return (
    <div className="absolute inset-0 z-0">
      <Suspense fallback={fallback}>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={["#FBF5DD"]} />
          <IndiaGlobe mouse={mouseRef} scrollProgress={scrollProgress} />
        </Canvas>
      </Suspense>
      <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-cream/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-transparent to-cream/90 pointer-events-none" />
    </div>
  );
}
