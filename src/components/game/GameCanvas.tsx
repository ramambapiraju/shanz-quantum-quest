import { useRef, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sky, PointerLockControls } from "@react-three/drei";
import * as THREE from "three";
import { Island } from "./Island";
import { OtherPlayers } from "./OtherPlayers";
import { Player } from "@/hooks/useMultiplayer";

interface GameCanvasProps {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  onPositionChange: (pos: THREE.Vector3) => void;
  onRotationChange: (rot: THREE.Euler) => void;
  onShoot: () => boolean;
  onReload: () => void;
  players: Player[];
  isReloading: boolean;
  ammo: number;
}

const PlayerController = ({
  position,
  onPositionChange,
  onRotationChange,
  onShoot,
  onReload,
  isReloading,
  ammo,
}: {
  position: THREE.Vector3;
  onPositionChange: (pos: THREE.Vector3) => void;
  onRotationChange: (rot: THREE.Euler) => void;
  onShoot: () => boolean;
  onReload: () => void;
  isReloading: boolean;
  ammo: number;
}) => {
  const { camera } = useThree();
  const moveSpeed = 0.15;
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW": keys.current.forward = true; break;
        case "KeyS": keys.current.backward = true; break;
        case "KeyA": keys.current.left = true; break;
        case "KeyD": keys.current.right = true; break;
        case "ShiftLeft": keys.current.sprint = true; break;
        case "KeyR": onReload(); break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW": keys.current.forward = false; break;
        case "KeyS": keys.current.backward = false; break;
        case "KeyA": keys.current.left = false; break;
        case "KeyD": keys.current.right = false; break;
        case "ShiftLeft": keys.current.sprint = false; break;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        onShoot();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [onShoot, onReload]);

  useFrame(() => {
    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3(0, 0, Number(keys.current.backward) - Number(keys.current.forward));
    const sideVector = new THREE.Vector3(Number(keys.current.left) - Number(keys.current.right), 0, 0);
    
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(moveSpeed * (keys.current.sprint ? 1.5 : 1))
      .applyEuler(camera.rotation);

    camera.position.add(direction);
    
    // Keep player at ground level (with simple terrain height)
    const groundY = 1.6 + Math.sin(camera.position.x * 0.05) * 2 + Math.sin(camera.position.z * 0.05) * 2;
    camera.position.y = Math.max(groundY, camera.position.y);

    // Boundary check
    const maxDistance = 100;
    if (camera.position.length() > maxDistance) {
      camera.position.normalize().multiplyScalar(maxDistance);
    }

    onPositionChange(camera.position);
    onRotationChange(camera.rotation);
  });

  return null;
};

const MuzzleFlash = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.visible = Math.random() > 0.9;
    }
  });

  return (
    <mesh ref={meshRef} position={[0.3, -0.3, -1]} visible={false}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#ffff00" />
    </mesh>
  );
};

const WeaponModel = ({ isReloading }: { isReloading: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Weapon sway
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.01;
      groupRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 2) * 0.01;
      
      // Reload animation
      if (isReloading) {
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 5) * 0.3;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0.4, -0.4, -0.8]}>
      {/* Gun body */}
      <mesh>
        <boxGeometry args={[0.08, 0.15, 0.5]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Barrel */}
      <mesh position={[0, 0.02, -0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#0f0f1a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Grip */}
      <mesh position={[0, -0.12, 0.1]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.06, 0.15, 0.08]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Quantum glow effect */}
      <pointLight position={[0, 0, -0.2]} color="#00ffff" intensity={0.3} distance={0.5} />
    </group>
  );
};

export const GameCanvas = ({
  position,
  rotation,
  onPositionChange,
  onRotationChange,
  onShoot,
  onReload,
  players,
  isReloading,
  ammo,
}: GameCanvasProps) => {
  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 1.6, 0] }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[50, 100, 50]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <hemisphereLight args={["#87CEEB", "#3a5a40", 0.5]} />

      {/* Sky */}
      <Sky
        distance={450000}
        sunPosition={[100, 20, 100]}
        inclination={0.5}
        azimuth={0.25}
      />

      {/* Fog for atmosphere */}
      <fog attach="fog" args={["#1a1a2e", 50, 200]} />

      {/* Environment */}
      <Island />

      {/* Other Players */}
      <OtherPlayers players={players} />

      {/* Weapon (attached to camera) */}
      <WeaponModel isReloading={isReloading} />

      {/* Player Controller */}
      <PlayerController
        position={position}
        onPositionChange={onPositionChange}
        onRotationChange={onRotationChange}
        onShoot={onShoot}
        onReload={onReload}
        isReloading={isReloading}
        ammo={ammo}
      />

      {/* Pointer Lock Controls */}
      <PointerLockControls />
    </Canvas>
  );
};
