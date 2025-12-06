import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Player } from "@/hooks/useMultiplayer";

interface OtherPlayersProps {
  players: Player[];
}

const PlayerModel = ({ player }: { player: Player }) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetPosition = useRef(new THREE.Vector3(
    player.position_x,
    player.position_y,
    player.position_z
  ));
  const targetRotation = useRef(player.rotation_y);

  useFrame(() => {
    if (!groupRef.current) return;

    // Update target position
    targetPosition.current.set(
      player.position_x,
      player.position_y,
      player.position_z
    );
    targetRotation.current = player.rotation_y;

    // Smooth interpolation
    groupRef.current.position.lerp(targetPosition.current, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current,
      0.1
    );
  });

  const healthColor = player.health > 50 ? "#00ff00" : player.health > 25 ? "#ffff00" : "#ff0000";

  return (
    <group
      ref={groupRef}
      position={[player.position_x, player.position_y, player.position_z]}
      rotation={[0, player.rotation_y, 0]}
    >
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.3, 1, 8, 16]} />
        <meshStandardMaterial
          color={player.is_alive ? "#4a9eff" : "#666666"}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color={player.is_alive ? "#ffb366" : "#666666"}
          roughness={0.8}
        />
      </mesh>

      {/* Health bar background */}
      <mesh position={[0, 1.5, 0]}>
        <planeGeometry args={[0.8, 0.1]} />
        <meshBasicMaterial color="#333333" side={THREE.DoubleSide} />
      </mesh>

      {/* Health bar */}
      <mesh position={[(player.health / 100 - 1) * 0.4, 1.5, 0.01]}>
        <planeGeometry args={[(player.health / 100) * 0.8, 0.08]} />
        <meshBasicMaterial color={healthColor} side={THREE.DoubleSide} />
      </mesh>

      {/* Player name */}
      <sprite position={[0, 1.8, 0]} scale={[2, 0.5, 1]}>
        <spriteMaterial color="#ffffff" opacity={0.8} transparent />
      </sprite>

      {/* Quantum glow effect for alive players */}
      {player.is_alive && (
        <pointLight
          position={[0, 0.5, 0]}
          color="#4a9eff"
          intensity={0.5}
          distance={3}
        />
      )}
    </group>
  );
};

export const OtherPlayers = ({ players }: OtherPlayersProps) => {
  return (
    <group>
      {players.map((player) => (
        <PlayerModel key={player.id} player={player} />
      ))}
    </group>
  );
};
