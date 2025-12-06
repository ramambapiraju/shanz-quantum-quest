import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generate terrain vertices
const generateTerrain = (size: number, resolution: number) => {
  const vertices: number[] = [];
  const indices: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];

  for (let z = 0; z <= resolution; z++) {
    for (let x = 0; x <= resolution; x++) {
      const xPos = (x / resolution - 0.5) * size;
      const zPos = (z / resolution - 0.5) * size;
      
      // Height calculation with multiple noise layers
      const height = 
        Math.sin(xPos * 0.05) * 3 +
        Math.sin(zPos * 0.05) * 3 +
        Math.sin(xPos * 0.1 + zPos * 0.1) * 1.5 +
        Math.sin(xPos * 0.2) * Math.sin(zPos * 0.2) * 2;
      
      vertices.push(xPos, height, zPos);
      uvs.push(x / resolution, z / resolution);

      // Color based on height
      const colorIntensity = (height + 5) / 10;
      if (height < 0) {
        colors.push(0.2, 0.3 + colorIntensity * 0.2, 0.1); // Dark green for low areas
      } else if (height < 2) {
        colors.push(0.3, 0.5 + colorIntensity * 0.2, 0.2); // Green for mid areas
      } else {
        colors.push(0.4, 0.35, 0.25); // Brown for high areas
      }
    }
  }

  // Generate indices
  for (let z = 0; z < resolution; z++) {
    for (let x = 0; x < resolution; x++) {
      const topLeft = z * (resolution + 1) + x;
      const topRight = topLeft + 1;
      const bottomLeft = (z + 1) * (resolution + 1) + x;
      const bottomRight = bottomLeft + 1;

      indices.push(topLeft, bottomLeft, topRight);
      indices.push(topRight, bottomLeft, bottomRight);
    }
  }

  return { vertices, indices, uvs, colors };
};

const Terrain = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    const { vertices, indices, uvs, colors } = generateTerrain(200, 100);
    const geo = new THREE.BufferGeometry();
    
    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    
    return geo;
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} receiveShadow>
      <meshStandardMaterial vertexColors side={THREE.DoubleSide} roughness={0.8} />
    </mesh>
  );
};

const Water = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = -1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[300, 300]} />
      <meshStandardMaterial
        color="#1e3a5f"
        transparent
        opacity={0.8}
        metalness={0.3}
        roughness={0.2}
      />
    </mesh>
  );
};

// Research Facility Buildings
const SuperconductingLab = () => {
  return (
    <group position={[30, 0, -30]}>
      {/* Main building */}
      <mesh position={[0, 5, 0]} castShadow>
        <boxGeometry args={[20, 10, 15]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Cryogenic pipes */}
      {[0, 5, 10].map((x, i) => (
        <mesh key={i} position={[x - 5, 8, 8]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 6]} />
          <meshStandardMaterial color="#4a9eff" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      
      {/* Warning sign glow */}
      <pointLight position={[0, 6, 8]} color="#ff0000" intensity={2} distance={10} />
      
      {/* Quantum glow effect */}
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[21, 11, 16]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

const TrappedIonArena = () => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={[-40, 0, 20]}>
      {/* Circular arena base */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[15, 15, 2, 32]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Ion trap columns */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 12, 5, Math.sin(angle) * 12]}
            castShadow
          >
            <cylinderGeometry args={[0.5, 0.5, 8, 8]} />
            <meshStandardMaterial color="#6b4eff" metalness={0.8} roughness={0.2} />
          </mesh>
        );
      })}
      
      {/* Central ion trap ring */}
      <mesh ref={ringRef} position={[0, 6, 0]}>
        <torusGeometry args={[5, 0.3, 16, 32]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Electromagnetic field visualization */}
      <pointLight position={[0, 6, 0]} color="#ff00ff" intensity={3} distance={20} />
    </group>
  );
};

const ControlTower = () => {
  return (
    <group position={[0, 0, 50]}>
      {/* Tower base */}
      <mesh position={[0, 4, 0]} castShadow>
        <boxGeometry args={[8, 8, 8]} />
        <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.5} />
      </mesh>
      
      {/* Tower top */}
      <mesh position={[0, 12, 0]} castShadow>
        <boxGeometry args={[10, 8, 10]} />
        <meshStandardMaterial color="#111827" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Windows */}
      <mesh position={[0, 12, 5.1]}>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0, 20, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 8]} />
        <meshStandardMaterial color="#374151" metalness={0.8} />
      </mesh>
      
      {/* Red warning light */}
      <pointLight position={[0, 24, 0]} color="#ff0000" intensity={5} distance={30} />
    </group>
  );
};

// Quantum Crate
const QuantumCrate = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={glowRef}>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.2} side={THREE.BackSide} />
      </mesh>
      <pointLight color="#00ffff" intensity={2} distance={10} />
    </group>
  );
};

// Trees/vegetation
const Tree = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} />
      </mesh>
      <mesh position={[0, 5, 0]} castShadow>
        <coneGeometry args={[2, 4, 8]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.8} />
      </mesh>
    </group>
  );
};

export const Island = () => {
  const trees = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 50; i++) {
      const x = (Math.random() - 0.5) * 150;
      const z = (Math.random() - 0.5) * 150;
      const y = Math.sin(x * 0.05) * 3 + Math.sin(z * 0.05) * 3;
      
      // Avoid placing trees in building areas
      if (
        Math.sqrt(Math.pow(x - 30, 2) + Math.pow(z + 30, 2)) > 25 &&
        Math.sqrt(Math.pow(x + 40, 2) + Math.pow(z - 20, 2)) > 20 &&
        Math.sqrt(Math.pow(x, 2) + Math.pow(z - 50, 2)) > 15
      ) {
        positions.push([x, y, z]);
      }
    }
    return positions;
  }, []);

  const cratePositions: [number, number, number][] = useMemo(() => [
    [10, 3, 10],
    [-20, 4, -15],
    [45, 3, 25],
    [-35, 3, -40],
    [25, 3, -50],
  ], []);

  return (
    <group>
      <Terrain />
      <Water />
      
      {/* Research Facilities */}
      <SuperconductingLab />
      <TrappedIonArena />
      <ControlTower />
      
      {/* Trees */}
      {trees.map((pos, i) => (
        <Tree key={i} position={pos} />
      ))}
      
      {/* Quantum Crates */}
      {cratePositions.map((pos, i) => (
        <QuantumCrate key={i} position={pos} />
      ))}
    </group>
  );
};
