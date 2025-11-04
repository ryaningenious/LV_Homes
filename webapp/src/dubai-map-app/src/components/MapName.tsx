"use client";

import { useRef } from "react";
import { Text } from "@react-three/drei";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface MapNameProps {
  longitude: number;
  latitude: number;
  title: string;
  fontSize: number;
}

function getXAndY(lat: number, lon: number): { z: number; x: number } {
  const originLat = 25.1303736604248;
  const originLon = 55.1171101965523;

  const refLat = 25.1972040023996;
  const refLon = 55.2743750222073;

  const scaleLat = (refLat - originLat) / 82;
  const scaleLon = (refLon - originLon) / 175;

  const z = (lat - originLat) / scaleLat;
  const x = (lon - originLon) / scaleLon;

  return { z, x };
}

export function MapName({
  longitude,
  latitude,
  title,
  fontSize,
}: MapNameProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const cardRef = useRef<THREE.Mesh>(null!);

  // Convert longitude and latitude to x, y, z coordinates
  const { z, x } = getXAndY(latitude, longitude);

  const y = 0;

  useFrame((state) => {
    if (cardRef.current) {
      cardRef.current.position.y =
        3 + Math.sin(state.clock.elapsedTime + x * 100) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[x, y, -z]}>
      <Text
        position={[0, 10, 0]}
        rotation={[-Math.PI / 2, 0, 0]} // Lay flat
        fontSize={fontSize}
        color="#062633"
        anchorX="center"
        anchorY="middle"
        // font="https://fonts.gstatic.com/s/googlesanscode/v4/pxifyogzv91QhV44Z_GQBHsGf5PuWE5krw.woff2"
        outlineWidth={0.2}
        outlineColor="#ffffff"
        outlineOpacity={0.9}
      >
        {title}
      </Text>
    </group>
  );
}
