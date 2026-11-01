import React, { useRef, useMemo } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { globalScrollState } from "@/lib/scrollStore";

interface SculptureProps {
  reducedMotion?: boolean;
}

export const ArchitecturalKineticSculpture: React.FC<SculptureProps> = ({
  reducedMotion = false,
}) => {
  const masterGroupRef = useRef<THREE.Group>(null);
  const ceramicKnotRef = useRef<THREE.Mesh>(null);
  const titaniumKnotRef = useRef<THREE.Mesh>(null);
  const glassCoreRef = useRef<THREE.Mesh>(null);
  const innerGemRef = useRef<THREE.Mesh>(null);
  const vermilionRingRef = useRef<THREE.Mesh>(null);
  const oliveRingRef = useRef<THREE.Mesh>(null);
  const satelliteGroupRef = useRef<THREE.Group>(null);
  const dustRef = useRef<THREE.Points>(null);

  // Inertial momentum for pointer drag & click
  const dragMomentum = useRef({ x: 0, y: 0 });
  const isPointerDown = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });

  // 24 architectural stardust coordinates (minimal, non-confetti)
  const dustCount = 28;
  const [dustPositions, dustColors] = useMemo(() => {
    const pos = new Float32Array(dustCount * 3);
    const col = new Float32Array(dustCount * 3);
    const vermilion = new THREE.Color("#E65336");
    const ink = new THREE.Color("#20201D");
    const olive = new THREE.Color("#8A9367");

    for (let i = 0; i < dustCount; i++) {
      const radius = 2.4 + Math.random() * 1.6;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      pos[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(theta);

      const rand = Math.random();
      const color = rand > 0.7 ? vermilion : rand > 0.4 ? olive : ink;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;
    const scroll = globalScrollState.progress;

    // Decay drag momentum smoothly
    dragMomentum.current.x = THREE.MathUtils.lerp(dragMomentum.current.x, 0, 0.04);
    dragMomentum.current.y = THREE.MathUtils.lerp(dragMomentum.current.y, 0, 0.04);

    if (masterGroupRef.current) {
      // Smooth camera/object tilt interpolation reacting to cursor & scroll
      const targetRotX = pointer.y * 0.42 + scroll * 1.8 + dragMomentum.current.y;
      const targetRotY = pointer.x * 0.52 + scroll * 2.2 + dragMomentum.current.x;

      masterGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        masterGroupRef.current.rotation.x,
        targetRotX,
        0.045
      );
      masterGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        masterGroupRef.current.rotation.y,
        targetRotY,
        0.045
      );

      // Subtle parallax position float
      masterGroupRef.current.position.x = THREE.MathUtils.lerp(
        masterGroupRef.current.position.x,
        pointer.x * 0.35,
        0.045
      );
      masterGroupRef.current.position.y = THREE.MathUtils.lerp(
        masterGroupRef.current.position.y,
        pointer.y * 0.28 - scroll * 0.9,
        0.045
      );
    }

    // 1. Primary Warm Ceramic Twisted Monolith Ribbon (Slow, sculptural majestic roll)
    if (ceramicKnotRef.current) {
      ceramicKnotRef.current.rotation.y += delta * 0.16;
      ceramicKnotRef.current.rotation.x = Math.sin(time * 0.32) * 0.22;
      ceramicKnotRef.current.rotation.z = Math.cos(time * 0.28) * 0.18;
    }

    // 2. Interlocking Brushed Titanium Ring (Counter-rotates through ceramic apertures)
    if (titaniumKnotRef.current) {
      titaniumKnotRef.current.rotation.y -= delta * 0.22;
      titaniumKnotRef.current.rotation.z += delta * 0.14;
      titaniumKnotRef.current.rotation.x = Math.cos(time * 0.38) * 0.25;
    }

    // 3. Faceted Translucent Crystal Core (Gentle tumbling jewel)
    if (glassCoreRef.current) {
      glassCoreRef.current.rotation.x += delta * 0.28;
      glassCoreRef.current.rotation.y += delta * 0.35;
    }

    // 4. Inner Vermilion Spark Gem
    if (innerGemRef.current) {
      innerGemRef.current.rotation.x -= delta * 0.45;
      innerGemRef.current.rotation.z -= delta * 0.38;
      const pulse = 1 + Math.sin(time * 2.2) * 0.08;
      innerGemRef.current.scale.set(pulse, pulse, pulse);
    }

    // 5. Vermilion Orbital Energy Band (Precession motion)
    if (vermilionRingRef.current) {
      vermilionRingRef.current.rotation.z += delta * 0.38;
      vermilionRingRef.current.rotation.x = Math.sin(time * 0.45) * 0.35;
    }

    // 6. Olive Structural Meridian Ring
    if (oliveRingRef.current) {
      oliveRingRef.current.rotation.y -= delta * 0.32;
      oliveRingRef.current.rotation.z = Math.cos(time * 0.4) * 0.3;
    }

    // 7. Satellite Nodes Rotation
    if (satelliteGroupRef.current) {
      satelliteGroupRef.current.rotation.y += delta * 0.35;
      satelliteGroupRef.current.rotation.x += delta * 0.2;
    }

    // 8. Minimal Spatial Dust slow ambient drift
    if (dustRef.current) {
      dustRef.current.rotation.y = time * 0.025;
    }
  });

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    isPointerDown.current = true;
    prevPointer.current = { x: e.clientX, y: e.clientY };
    dragMomentum.current.x += (Math.random() - 0.5) * 0.6;
    dragMomentum.current.y += (Math.random() - 0.5) * 0.6;
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isPointerDown.current) return;
    const dx = (e.clientX - prevPointer.current.x) * 0.005;
    const dy = (e.clientY - prevPointer.current.y) * 0.005;
    dragMomentum.current.x += dx;
    dragMomentum.current.y += dy;
    prevPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isPointerDown.current = false;
  };

  return (
    <group
      ref={masterGroupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      scale={1.08}
    >
      <Float
        speed={reducedMotion ? 0 : 1.8}
        rotationIntensity={reducedMotion ? 0 : 0.25}
        floatIntensity={reducedMotion ? 0 : 0.45}
      >
        {/* ========================================================= */}
        {/* FORM 01: Warm Ceramic White Twisted Monolith Ribbon       */}
        {/* ========================================================= */}
        <mesh ref={ceramicKnotRef} castShadow receiveShadow>
          <torusKnotGeometry args={[1.35, 0.34, 220, 36, 2, 3]} />
          <meshPhysicalMaterial
            color="#FAF7F2"
            roughness={0.22}
            metalness={0.05}
            clearcoat={0.9}
            clearcoatRoughness={0.12}
            reflectivity={0.7}
            sheen={0.4}
            sheenColor={new THREE.Color("#FFF9EE")}
          />
        </mesh>

        {/* ========================================================= */}
        {/* FORM 02: Interlocking Brushed Titanium Ribbon              */}
        {/* ========================================================= */}
        <mesh ref={titaniumKnotRef} scale={1.12} castShadow receiveShadow>
          <torusKnotGeometry args={[1.5, 0.11, 180, 28, 3, 4]} />
          <meshStandardMaterial
            color="#D8D4CC"
            roughness={0.24}
            metalness={0.92}
          />
        </mesh>

        {/* ========================================================= */}
        {/* FORM 03: Translucent Architectural Frosted Crystal Core   */}
        {/* ========================================================= */}
        <mesh ref={glassCoreRef} scale={0.72}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#F5F1E8"
            transmission={0.65}
            opacity={0.88}
            transparent
            roughness={0.14}
            ior={1.48}
            thickness={0.9}
            clearcoat={0.8}
          />
        </mesh>

        {/* Inner Vermilion Jewel Kernel */}
        <mesh ref={innerGemRef} scale={0.32}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#E65336"
            emissive="#E65336"
            emissiveIntensity={0.65}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>

        {/* ========================================================= */}
        {/* FORM 04: Vermilion Kinetic Energy Band Ring               */}
        {/* ========================================================= */}
        <mesh
          ref={vermilionRingRef}
          rotation={[0.7, -0.4, 0.8]}
          scale={1.1}
        >
          <torusGeometry args={[2.05, 0.024, 20, 128]} />
          <meshStandardMaterial
            color="#E65336"
            emissive="#E65336"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>

        {/* ========================================================= */}
        {/* FORM 05: Olive Bronze Structural Meridian Ring            */}
        {/* ========================================================= */}
        <mesh
          ref={oliveRingRef}
          rotation={[-0.5, 0.9, -0.3]}
          scale={1.18}
        >
          <torusGeometry args={[2.28, 0.016, 20, 128]} />
          <meshStandardMaterial
            color="#8A9367"
            roughness={0.32}
            metalness={0.75}
          />
        </mesh>

        {/* ========================================================= */}
        {/* FORM 06: Precision Satellite Counterweight Nodes           */}
        {/* ========================================================= */}
        <group ref={satelliteGroupRef}>
          {/* Node 1: Vermilion sphere on equatorial orbit */}
          <mesh position={[2.05, 0, 0]} scale={0.075}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#E65336" roughness={0.2} metalness={0.6} />
          </mesh>

          {/* Node 2: Titanium bead on opposite orbit */}
          <mesh position={[-2.05, 0, 0]} scale={0.065}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#D8D4CC" roughness={0.15} metalness={0.95} />
          </mesh>

          {/* Node 3: Olive architectural cuboid node on polar axis */}
          <mesh position={[0, 2.28, 0]} scale={0.08}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#8A9367" roughness={0.3} metalness={0.8} />
          </mesh>

          {/* Node 4: Charcoal anchor bead */}
          <mesh position={[0, -2.28, 0]} scale={0.065}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#20201D" roughness={0.3} metalness={0.5} />
          </mesh>
        </group>

        {/* ========================================================= */}
        {/* FORM 07: Ambient Spatial Stardust (Depth & Scale)         */}
        {/* ========================================================= */}
        <points ref={dustRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={dustCount}
              array={dustPositions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={dustCount}
              array={dustColors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.045}
            vertexColors
            transparent
            opacity={0.65}
            sizeAttenuation
          />
        </points>
      </Float>
    </group>
  );
};

export default ArchitecturalKineticSculpture;
