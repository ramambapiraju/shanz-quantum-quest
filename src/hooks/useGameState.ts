import { useState, useCallback, useRef } from "react";
import * as THREE from "three";

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  duration: number;
  isActive: boolean;
  activatedAt?: number;
}

export interface GameState {
  health: number;
  ammo: number;
  maxAmmo: number;
  isReloading: boolean;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  kills: number;
  deaths: number;
  powerUps: PowerUp[];
}

export const useGameState = () => {
  const [health, setHealth] = useState(100);
  const [ammo, setAmmo] = useState(30);
  const [maxAmmo] = useState(30);
  const [isReloading, setIsReloading] = useState(false);
  const [position, setPosition] = useState(new THREE.Vector3(0, 1.6, 0));
  const [rotation, setRotation] = useState(new THREE.Euler(0, 0, 0));
  const [kills, setKills] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([
    {
      id: "qiskit-injector",
      name: "Qiskit SDK Injector",
      description: "Harness the power of quantum software development. Temporarily enhances movement speed by 50%.",
      duration: 10000,
      isActive: false,
    },
  ]);

  const reloadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shoot = useCallback(() => {
    if (isReloading || ammo <= 0) return false;
    setAmmo(prev => prev - 1);
    return true;
  }, [isReloading, ammo]);

  const reload = useCallback(() => {
    if (isReloading || ammo === maxAmmo) return;
    
    setIsReloading(true);
    reloadTimeoutRef.current = setTimeout(() => {
      setAmmo(maxAmmo);
      setIsReloading(false);
    }, 2000);
  }, [isReloading, ammo, maxAmmo]);

  const takeDamage = useCallback((damage: number) => {
    setHealth(prev => {
      const newHealth = Math.max(0, prev - damage);
      if (newHealth === 0) {
        setDeaths(d => d + 1);
      }
      return newHealth;
    });
  }, []);

  const heal = useCallback((amount: number) => {
    setHealth(prev => Math.min(100, prev + amount));
  }, []);

  const updatePosition = useCallback((newPosition: THREE.Vector3) => {
    setPosition(newPosition.clone());
  }, []);

  const updateRotation = useCallback((newRotation: THREE.Euler) => {
    setRotation(new THREE.Euler(newRotation.x, newRotation.y, newRotation.z));
  }, []);

  const addKill = useCallback(() => {
    setKills(prev => prev + 1);
  }, []);

  const activatePowerUp = useCallback((powerUpId: string) => {
    setPowerUps(prev => prev.map(pu => {
      if (pu.id === powerUpId && !pu.isActive) {
        setTimeout(() => {
          setPowerUps(current => current.map(p => 
            p.id === powerUpId ? { ...p, isActive: false, activatedAt: undefined } : p
          ));
        }, pu.duration);
        
        return { ...pu, isActive: true, activatedAt: Date.now() };
      }
      return pu;
    }));
  }, []);

  const respawn = useCallback(() => {
    setHealth(100);
    setAmmo(maxAmmo);
    setPosition(new THREE.Vector3(
      (Math.random() - 0.5) * 50,
      1.6,
      (Math.random() - 0.5) * 50
    ));
  }, [maxAmmo]);

  return {
    health,
    ammo,
    maxAmmo,
    isReloading,
    position,
    rotation,
    kills,
    deaths,
    powerUps,
    shoot,
    reload,
    takeDamage,
    heal,
    updatePosition,
    updateRotation,
    addKill,
    activatePowerUp,
    respawn,
  };
};
