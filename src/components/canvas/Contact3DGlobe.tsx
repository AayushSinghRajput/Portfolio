import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ContactGlobeProps {
  reducedMotion?: boolean;
}

export const Contact3DGlobe = ({ reducedMotion = false }: ContactGlobeProps) => {
  const globeGroupRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.Mesh>(null);
  const radarRingRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Generate uniform points on the globe surface
  const pointCount = 340;
  const positions = useMemo(() => {
    const pos = new Float32Array(pointCount * 3);
    const radius = 1.6;

    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;

      pos[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(theta);
    }
    return pos;
  }, []);

  // Kathmandu coordinate on the globe: Lat: 27.7° N, Lon: 85.3° E
  const beaconPosition = useMemo(() => {
    const lat = (27.7 * Math.PI) / 180;
    const lon = (85.3 * Math.PI) / 180;
    const r = 1.62;
    const x = r * Math.cos(lat) * Math.cos(lon);
    const y = r * Math.sin(lat);
    const z = r * Math.cos(lat) * Math.sin(lon);
    return [x, y, z] as [number, number, number];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (globeGroupRef.current) {
      if (!reducedMotion) {
        // Continuous smooth planetary rotation
        globeGroupRef.current.rotation.y += delta * 0.24;
        globeGroupRef.current.rotation.x = Math.sin(time * 0.25) * 0.08;

        // Pointer influence
        globeGroupRef.current.rotation.y += state.pointer.x * delta * 0.25;
      }
    }

    if (beaconRef.current) {
      // Pulse beacon scale
      const pulse = 1 + Math.sin(time * 5) * 0.3;
      beaconRef.current.scale.set(pulse, pulse, pulse);
    }

    if (radarRingRef.current) {
      // Expand and fade radar ping
      const pingProgress = (time * 1.5) % 1;
      const s = 1 + pingProgress * 1.8;
      radarRingRef.current.scale.set(s, s, s);
      const mat = radarRingRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = (1 - pingProgress) * 0.7;
      }
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.18;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.15;
    }
  });

  return (
    <group ref={globeGroupRef}>
      {/* Translucent Dark Hologram Core */}
      <mesh>
        <sphereGeometry args={[1.52, 32, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.3}
          metalness={0.7}
          transparent={true}
          opacity={0.85}
        />
      </mesh>

      {/* Surface Latitude / Longitude Wireframe */}
      <mesh>
        <sphereGeometry args={[1.55, 24, 24]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0284c7"
          emissiveIntensity={0.3}
          wireframe={true}
          transparent={true}
          opacity={0.35}
        />
      </mesh>

      {/* Surface Constellation Points (Glowing Nodes) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pointCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color="#38bdf8"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Outer Tilted Orbit Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.95, 0.014, 16, 80]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
      </mesh>

      {/* Outer Tilted Orbit Ring 2 */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[2.1, 0.012, 16, 80]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
      </mesh>

      {/* Kathmandu Beacon Group */}
      <group position={beaconPosition}>
        {/* Pulsing Emerald Dot */}
        <mesh ref={beaconRef}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>

        {/* Radiating Radar Ping */}
        <mesh ref={radarRingRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.06, 0.08, 24]} />
          <meshBasicMaterial color="#34d399" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Atmospheric Halo Glow */}
      <mesh>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.09}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default Contact3DGlobe;
