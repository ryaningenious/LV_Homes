"use client";

import React from "react";
import * as THREE from "three";

interface MapGridProps {
  size: number;
  divisions: number;
  color?: string;
  opacity?: number;
}

export function MapGrid({
  size = 100,
  divisions = 10,
  color = "red",
  opacity = 1,
}: MapGridProps) {
  const gridHelper = React.useMemo(() => {
    const helper = new THREE.GridHelper(
      size,
      divisions,
      new THREE.Color(color),
      new THREE.Color(color)
    );
    helper.material.transparent = true;
    helper.material.opacity = opacity;
    helper.position.y = 1; // Slightly above the map to prevent z-fighting
    return helper;
  }, [size, divisions, color, opacity]);

  return <primitive object={gridHelper} />;
}
