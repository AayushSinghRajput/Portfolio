import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";

interface SkillItem {
  name: string;
  category: string;
  color: string;
  glowColor: string;
}

const SKILL_ITEMS: SkillItem[] = [
  { name: "React", category: "Frontend", color: "text-cyan-400", glowColor: "#38bdf8" },
  { name: "TypeScript", category: "Language", color: "text-blue-400", glowColor: "#60a5fa" },
  { name: "Python", category: "Language", color: "text-amber-400", glowColor: "#f59e0b" },
  { name: "FastAPI", category: "Backend", color: "text-emerald-400", glowColor: "#10b981" },
  { name: "Next.js", category: "Fullstack", color: "text-slate-200", glowColor: "#e2e8f0" },
  { name: "Node.js", category: "Backend", color: "text-green-400", glowColor: "#4ade80" },
  { name: "ChromaDB", category: "AI / Vector", color: "text-fuchsia-400", glowColor: "#d946ef" },
  { name: "RAG & LLMs", category: "AI / ML", color: "text-purple-400", glowColor: "#a855f7" },
  { name: "Tailwind CSS", category: "Styling", color: "text-sky-400", glowColor: "#38bdf8" },
  { name: "MongoDB", category: "Database", color: "text-emerald-400", glowColor: "#34d399" },
  { name: "Express", category: "Backend", color: "text-violet-400", glowColor: "#8b5cf6" },
  { name: "Git", category: "DevOps", color: "text-orange-400", glowColor: "#f97316" },
  { name: "scikit-learn", category: "ML", color: "text-yellow-400", glowColor: "#eab308" },
  { name: "Technical SEO", category: "Growth", color: "text-teal-400", glowColor: "#14b8a6" },
  { name: "REST APIs", category: "Architecture", color: "text-cyan-400", glowColor: "#06b6d4" },
  { name: "Vector DBs", category: "AI / Data", color: "text-pink-400", glowColor: "#ec4899" },
];

export const Skills3DCloud = ({ reducedMotion = false }: { reducedMotion?: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  // Distribute skills along spherical surface
  const nodes = useMemo(() => {
    const count = SKILL_ITEMS.length;
    const radius = 2.6;
    return SKILL_ITEMS.map((skill, index) => {
      const phi = Math.acos(-1 + (2 * index + 1) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      return {
        ...skill,
        position: [x, y, z] as [number, number, number],
      };
    });
  }, []);

  // Ambient stardust particles
  const particlePositions = useMemo(() => {
    const count = 50;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.0 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i * 3] = r * Math.cos(theta) * Math.cos(phi);
      pos[i * 3 + 1] = r * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current && !reducedMotion) {
      // Elegant slow rotation
      groupRef.current.rotation.y += delta * 0.16;
      groupRef.current.rotation.x = Math.sin(time * 0.25) * 0.1;

      // Pointer influence
      const pointer = state.pointer;
      groupRef.current.rotation.y += pointer.x * delta * 0.35;
      groupRef.current.rotation.x -= pointer.y * delta * 0.25;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Holographic Gyro Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.4}>
        <mesh scale={0.75}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#0284c7"
            emissiveIntensity={0.8}
            wireframe={true}
          />
        </mesh>

        <mesh scale={0.45}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#a855f7" wireframe={true} />
        </mesh>
      </Float>

      {/* Orbital Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3.5, 0, 0]}>
        <torusGeometry args={[2.8, 0.012, 16, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[3.0, 0.01, 16, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
      </mesh>

      {/* Ambient Stardust Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={50}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#38bdf8"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Interactive 3D HTML Tech Badges */}
      {nodes.map((node, idx) => (
        <group key={idx} position={node.position}>
          {/* Small 3D Glowing Anchor Node */}
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial
              color={node.glowColor}
              emissive={node.glowColor}
              emissiveIntensity={1.2}
            />
          </mesh>

          {/* Projected 3D HTML Badge */}
          <Html center distanceFactor={7} zIndexRange={[100, 0]}>
            <div
              onMouseEnter={() => setActiveSkill(node.name)}
              onMouseLeave={() => setActiveSkill(null)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md border transition-all duration-300 select-none cursor-pointer shadow-lg whitespace-nowrap ${
                activeSkill === node.name
                  ? "bg-primary text-primary-foreground border-primary scale-110 shadow-primary/40 -translate-y-1"
                  : "bg-background/85 text-foreground/90 border-border/80 hover:border-primary/60 hover:bg-background/95"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: node.glowColor }}
              />
              <span className="text-xs font-semibold tracking-tight">{node.name}</span>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};

export default Skills3DCloud;
