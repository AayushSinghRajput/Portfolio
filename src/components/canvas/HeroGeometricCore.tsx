import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface GeometricCoreProps {
  reducedMotion?: boolean;
}

export const GeometricCore = ({ reducedMotion = false }: GeometricCoreProps) => {
  const outerGroupRef = useRef<THREE.Group>(null);
  const coreIcosaRef = useRef<THREE.Mesh>(null);
  const wireframeInnerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Floating ambient micro-particles
  const particleCount = 70;
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const scl = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      // Spread in a sphere volume around the core
      const radius = 2.5 + Math.random() * 2.5;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      pos[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(theta);

      scl[i] = Math.random() * 0.05 + 0.02;
    }
    return [pos, scl];
  }, []);

  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;

    if (outerGroupRef.current) {
      if (!reducedMotion) {
        // Smoothly interpolate group rotation with pointer coordinates
        const targetRotX = pointer.y * 0.35;
        const targetRotY = pointer.x * 0.45;

        outerGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          outerGroupRef.current.rotation.x,
          targetRotX,
          0.05
        );
        outerGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          outerGroupRef.current.rotation.y,
          targetRotY,
          0.05
        );

        // Subtle position parallax float
        outerGroupRef.current.position.x = THREE.MathUtils.lerp(
          outerGroupRef.current.position.x,
          pointer.x * 0.3,
          0.05
        );
        outerGroupRef.current.position.y = THREE.MathUtils.lerp(
          outerGroupRef.current.position.y,
          pointer.y * 0.25,
          0.05
        );
      }
    }

    // Rotate core polyhedron
    if (coreIcosaRef.current) {
      coreIcosaRef.current.rotation.x += delta * 0.2;
      coreIcosaRef.current.rotation.y += delta * 0.25;
    }

    // Counter-rotate wireframe core
    if (wireframeInnerRef.current) {
      wireframeInnerRef.current.rotation.x -= delta * 0.28;
      wireframeInnerRef.current.rotation.y -= delta * 0.35;
    }

    // Smooth rotation for orbital rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4;
      ring1Ref.current.rotation.x += delta * 0.15;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.35;
      ring2Ref.current.rotation.y += delta * 0.2;
    }

    // Slowly rotate particle field
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.04;
      particlesRef.current.rotation.x = Math.sin(time * 0.03) * 0.08;
    }
  });

  return (
    <group ref={outerGroupRef}>
      {/* Gentle overall breathing float */}
      <Float
        speed={reducedMotion ? 0 : 2}
        rotationIntensity={reducedMotion ? 0 : 0.4}
        floatIntensity={reducedMotion ? 0 : 0.6}
      >
        {/* Central Frosted Glass Polyhedron */}
        <mesh ref={coreIcosaRef} scale={1.25}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            roughness={0.12}
            transmission={0.85}
            ior={1.45}
            reflectivity={0.7}
            thickness={1.5}
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.25}
            transparent={true}
            opacity={0.88}
          />
        </mesh>

        {/* Nested Inner Geometric Wireframe (Emerald / Purple Accents) */}
        <mesh ref={wireframeInnerRef} scale={0.85}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#10b981"
            emissiveIntensity={0.6}
            wireframe={true}
            wireframeLinewidth={1.5}
          />
        </mesh>

        {/* Core Pulsing Point Light */}
        <pointLight color="#38bdf8" intensity={1.8} distance={6} />
        <pointLight color="#a855f7" intensity={1.2} distance={4} position={[0, -0.5, 0]} />

        {/* Outer Orbital Ring 1 (Cyan Iridescent) */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.9, 0.02, 16, 80]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#0891b2"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Outer Orbital Ring 2 (Purple / Violet) */}
        <mesh ref={ring2Ref} rotation={[-Math.PI / 3.5, Math.PI / 4, 0]}>
          <torusGeometry args={[2.2, 0.018, 16, 80]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#9333ea"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Ambient Stardust Particles */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={positions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.045}
            color="#38bdf8"
            transparent
            opacity={0.65}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>
      </Float>
    </group>
  );
};
