"use client";

import { useState, useRef, useEffect } from "react";
import { Html } from "@react-three/drei";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Location } from "../utils/api/locationService";

interface LocationPointerProps {
  longitude: number;
  latitude: number;
  title: string;
  description: string;
  location: Location;
  onPointerClick: (x: number, z: number, loc: Location) => void;
}

function getContrastColor(bgColor: string): string {
  if (!bgColor.startsWith("#") || bgColor.length !== 7) return "white"; // Default fallback

  const r = parseInt(bgColor.substring(1, 3), 16);
  const g = parseInt(bgColor.substring(3, 5), 16);
  const b = parseInt(bgColor.substring(5, 7), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "black" : "white";
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

export function LocationPointer({
  longitude,
  latitude,
  title,
  location,
  onPointerClick,
}: LocationPointerProps) {
  const [hovered, setHovered] = useState(false);

  const groupRef = useRef<THREE.Group>(null!);
  const cardRef = useRef<THREE.Mesh>(null!);

  const [textColor, setTextColor] = useState<string>("black");
  const [bgColor, setBgColor] = useState("#232531"); // Default blue

  useEffect(() => {
    setTextColor(getContrastColor(location.color ?? "#232531"));
    setBgColor(location.color ?? "#232531");
  }, [location.color]);

  // Convert longitude and latitude to x, y, z coordinates
  const { z, x } = getXAndY(latitude, longitude);

  // const { z, x } = { z: latitude, x: longitude };
  const y = 0; // Assuming a flat map

  useFrame((state) => {
    if (cardRef.current) {
      cardRef.current.position.y =
        3 + Math.sin(state.clock.elapsedTime + x * 100) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[x, y, -z]}>
      <mesh ref={cardRef} position={[0, 0, 0]}>
        <Html
          position={[0, hovered ? 15 : 6, hovered ? 10 : 0]}
          style={{
            transition: "all 0.2s",
            opacity: 1, //hovered ? 1 : 0,
            transform: `scale(${hovered ? 1.5 : 1})  translateX(-50%)`,
            transformOrigin: "bottom left",
            position: "absolute",
            bottom: "0",
            left: "50%",
          }}
        >
          <div
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <div
              className="relative w-40 h-16 rounded-lg  shadow-lg flex items-center justify-center  p-px bg-gradient-to-tl from-black to-gray-100"
              onClick={() => {
                onPointerClick(x, -z, location);
              }}
            >
              <div className="relative absolute top-0 w-full h-full rounded-lg shadow-lg flex items-center justify-center cursor-pointer transition-all duration-500 origin-left overflow-hidden rounded-[calc(1.5rem-1px)] p-8">
                <div
                  style={{
                    // backgroundColor: bgColor,
                    background: `radial-gradient(circle at top left, #575353, ${bgColor})`,
                  }}
                  className="size-full absolute top-0 left-0 opacity-90"
                ></div>
                <div
                  className="absolute size-full z-10 flex items-center justify-center"
                  style={{
                    color: textColor,
                  }}
                >
                  <div className="text-sm text-center">{title}</div>
                </div>
              </div>
            </div>
          </div>
        </Html>
      </mesh>
      <Html
        position={[0, 1, 0]}
        // transform
        style={{
          transition: "all 0.2s",
          opacity: 1, //hovered ? 1 : 0,
          transform: ` translateX(-50%)`,
          transformOrigin: "bottom left",
          position: "absolute",
          bottom: "0",
          left: "50%",
          // transform: `scale(5) translateY(-42%)`,
        }}
      >
        <div
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <div className="">
            <FaMapMarkerAlt
              onClick={() => onPointerClick(x, -z, location)}
              className="text-5xl"
              color="indianred"
            />
          </div>
        </div>
      </Html>
    </group>
  );
}
