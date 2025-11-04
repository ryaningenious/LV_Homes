"use client";

import { useRef, useEffect, Suspense, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrthographicCamera,
  OrbitControls,
  useGLTF,
  SoftShadows,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";
import { LocationPointer } from "./LocationPointer";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import { LoadingScreen } from "./LoadingScreen";

import gsap from "gsap";
import { getLocations, Location } from "../utils/api/locationService";
import { getGlbFiles, GLBModel } from "../utils/api/glbService";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./Drawer";
import { useMediaQuery } from "react-responsive";
import { MapName } from "./MapName";

interface ModelProps {
  url: string;
  onClick?: (event: THREE.Event) => void;
}

useGLTF.preload(
  "https://www.gstatic.com/draco/versioned/decoders/1.4.1/draco_decoder.js"
);

const communities = [
  {
    title: "PALM JUMEIRAH",
    latitude: 25.112222,
    longitude: 55.138333,
    fontSize: 2.5,
  },
  {
    title: "DUBAI MARINA",
    latitude: 25.08,
    longitude: 55.14,
    fontSize: 2.5,
  },
  {
    title: "JLT",
    latitude: 25.0746,
    longitude: 55.1389,
    fontSize: 2.5,
  },
  {
    title: "AL BARSHA",
    latitude: 25.111557,
    longitude: 55.212984,
    fontSize: 2.5,
  },
  {
    title: "UMM SUQEIM",
    latitude: 25.153611,
    longitude: 55.22,
    fontSize: 2.5,
  },
  {
    title: "AL QUOZ",
    latitude: 25.144289,
    longitude: 55.248614,
    fontSize: 2.5,
  },
  {
    title: "DUBAI ISLANDS",
    latitude: 25.333425452839318,
    longitude: 55.26804713671816,
    fontSize: 2.5,
  },
  {
    title: "DOWNTOWN",
    latitude: 25.195556,
    longitude: 55.275278,
    fontSize: 2.5,
  },
  {
    title: "MEYDAN",
    latitude: 25.184242,
    longitude: 55.27243,
    fontSize: 2.5,
  },
  {
    title: "JUMEIRAH GARDENS",
    latitude: 25.223182197082455,
    longitude: 55.27581063350402,
    fontSize: 2.5,
  },
  {
    title: "JADDAF WATERFRONT",
    latitude: 25.2272,
    longitude: 55.3136,
    fontSize: 2.5,
  },
  {
    title: "RAS AL KHOR",
    latitude: 25.192222,
    longitude: 55.343056,
    fontSize: 2.5,
  },
  {
    title: "NADD AL HAMAR",
    latitude: 25.203611,
    longitude: 55.391667,
    fontSize: 2.5,
  },
  {
    title: "NAD AL SHEBA",
    latitude: 25.1212,
    longitude: 55.3665,
    fontSize: 2.5,
  },
  {
    title: "DUBAI HILLS",
    latitude: 25.0794,
    longitude: 55.2831,
    fontSize: 2.5,
  },
  {
    title: "ARJAN",
    latitude: 25.0561,
    longitude: 55.2397,
    fontSize: 2.5,
  },
  {
    title: "MOTOR CITY",
    latitude: 25.0468,
    longitude: 55.2395,
    fontSize: 1.75,
  },
  {
    title: "DUBAI SPORTS CITY",
    latitude: 25.0464,
    longitude: 55.2244,
    fontSize: 1.75,
  },
  {
    title: "DUBAI PRODUCTION CITY",
    latitude: 25.0466,
    longitude: 55.1814,
    fontSize: 1.5,
  },
  {
    title: "JVC",
    latitude: 25.0601,
    longitude: 55.2232,
    fontSize: 2.5,
  },
  {
    title: "JVT",
    latitude: 25.0484,
    longitude: 55.2106,
    fontSize: 2.5,
  },
  {
    title: "JUMEIRAH GOLF ESTATES",
    latitude: 25.0213,
    longitude: 55.19,
    fontSize: 2.5,
  },
  {
    title: "GOLF CITY",
    latitude: 25.012387790876925,
    longitude: 55.234555920676605,
    fontSize: 2.5,
  },
  {
    title: "REMRAAM",
    latitude: 24.9246,
    longitude: 55.0922,
    fontSize: 2.5,
  },
  {
    title: "DAMAC HILLS",
    latitude: 25.0253,
    longitude: 55.2708,
    fontSize: 2.5,
  },
  {
    title: "MUDON",
    latitude: 25.0315,
    longitude: 55.2762,
    fontSize: 2.5,
  },
  {
    title: "DUBAI STUDIO CITY",
    latitude: 25.0425,
    longitude: 55.2303,
    fontSize: 1.75,
  },
  {
    title: "SAHEEL",
    latitude: 25.053222728264643,
    longitude: 55.259229500634476,
    fontSize: 2.5,
  },
  {
    title: "AL REEM",
    latitude: 24.4943108424612,
    longitude: 54.40626046377361,
    fontSize: 2.5,
  },
  {
    title: "AIRPORT",
    latitude: 25.252777,
    longitude: 55.364445,
    fontSize: 2.5,
  },
  {
    title: "DUBAI INVESTMENTS PARK",
    latitude: 24.9784,
    longitude: 55.1812,
    fontSize: 2.5,
  },
  {
    title: "JEBEL ALI INDUSTRIAL AREA",
    latitude: 24.9836,
    longitude: 55.1092,
    fontSize: 2.5,
  },
  {
    title: "PALM JABEL ALI",
    latitude: 25.007628908021957,
    longitude: 54.98832446563586,
    fontSize: 2.5,
  },
];

function Model({ url, onClick }: ModelProps) {
  const { scene, materials } = useGLTF(url);
  // const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // If the model has a material, update its color
  if (materials) {
    Object.values(materials).forEach((mat) => {
      mat.colorWrite = true;
      mat.needsUpdate = true;
      console.log(mat.name);
      if (mat.name === "road") {
        // @ts-expect-error color
        mat.color.set(new THREE.Color("#c8c8c9")); // Change to red
      }
      if (mat.name === "main_water") {
        // @ts-expect-error color
        mat.color.set(new THREE.Color("#2c708e")); // Change to red
      }
      if (mat.name === "Material.002") {
        // @ts-expect-error color
        mat.color.set(new THREE.Color("#f6e2b7")); // Change to red
      }
    });
  }

  return <primitive object={scene} onClick={onClick} />;
}

function Models() {
  const [glbFiles, setGlbFiles] = useState<GLBModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const glb = await getGlbFiles();
        setGlbFiles(glb);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {glbFiles.map((model, index) => (
        <Model key={index} url={model.url} />
      ))}
    </>
  );
}

function CameraSetup() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 300, 200);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 100, 25]} intensity={4} />
    </>
  );
}

function LoadingManager() {
  const { progress } = useProgress();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return isLoading ? <LoadingScreen /> : null;
}

interface SceneManagerProps {
  onCameraCenter: (loc: Location) => void;
}
function SceneManager({ onCameraCenter }: SceneManagerProps) {
  const controlsRef = useRef<any>(null);
  const { camera, gl } = useThree();

  const { progress } = useProgress();

  const [locations, setLocations] = useState<Location[]>([]);

  const fetchLocation = async () => {
    try {
      const response = await getLocations();
      setLocations(response);
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(async () => {
        recenterCamera(30, 30);
        await fetchLocation();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  useFrame(() => {
    if (controlsRef.current) {
      // Limit panning
      const minPan = new THREE.Vector3(-150, 0, -170);
      const maxPan = new THREE.Vector3(300, 0, 300);
      const _v = new THREE.Vector3();

      _v.copy(controlsRef.current.target);
      controlsRef.current.target.clamp(minPan, maxPan);
      _v.sub(controlsRef.current.target);
      camera.position.sub(_v);

      // Limit zoom
      camera.zoom = THREE.MathUtils.clamp(camera.zoom, 8, 10);

      camera.updateProjectionMatrix();
    }
  });

  const recenterCamera = useCallback(
    (x: number, z: number, loc?: Location) => {
      if (controlsRef.current) {
        const newTarget = new THREE.Vector3(x, 0, z);

        // Animate camera position and target for smooth transition
        gsap.to(camera.position, {
          x: x,
          y: 200,
          z: z + 200,
          duration: 0.8,
          ease: "power2.out",
          onUpdate: () => {
            camera.lookAt(newTarget);
            camera.updateProjectionMatrix();
          },
        });

        gsap.to(camera, {
          zoom: 10,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            camera.lookAt(newTarget);
            camera.updateProjectionMatrix();
          },
        });

        gsap.to(controlsRef.current.target, {
          x: newTarget.x,
          y: newTarget.y,
          z: newTarget.z,
          duration: 0.8,
          ease: "power2.out",
        });

        if (loc) {
          onCameraCenter(loc);
        }
      }
    },
    [camera]
  );

  return (
    <>
      <SoftShadows size={10} samples={16} />
      <OrthographicCamera makeDefault zoom={10} />
      <CameraSetup />
      <OrbitControls
        ref={controlsRef}
        args={[camera, gl.domElement]}
        enableRotate={false}
        enableZoom={true}
        enablePan={true}
        panSpeed={2}
        minZoom={8}
        enableDamping
        maxZoom={10}
        dampingFactor={0.05}
        screenSpacePanning={false}
        // minDistance={100}
        // maxDistance={1500}
        maxPolarAngle={Math.PI / 2}
        mouseButtons={{
          LEFT: THREE.MOUSE.PAN,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.ROTATE,
        }}
        touches={{
          ONE: THREE.TOUCH.PAN,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
      />
      <Lights />
      <Suspense fallback={null}>
        <Models />
        {/* <MapGrid size={1000} divisions={1000} color="red" opacity={0.2} /> */}
        {locations.map((loc, index) => (
          <LocationPointer
            key={index}
            longitude={loc.longitude}
            latitude={loc.latitude}
            title={loc.title}
            description={loc.description ?? ""}
            location={loc}
            onPointerClick={recenterCamera}
          />
        ))}
        {communities.map((loc, index) => (
          <MapName
            key={index}
            longitude={loc.longitude}
            latitude={loc.latitude}
            title={loc.title}
            fontSize={loc.fontSize}
          />
        ))}
      </Suspense>
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[1000, 1000]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>
    </>
  );
}

export default function Scene() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);

  // Handle mouse events at the container level
  const handleMouseDown = () => setIsGrabbing(true);
  const handleMouseUp = () => setIsGrabbing(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 769px)",
  });

  const drawerTrigger = useCallback((loc: Location) => {
    setLocation(loc);
    setIsOpen(true);
  }, []);

  return (
    <div className="">
      <div
        className="absolute z-10 size-full"
        style={{
          cursor: isGrabbing ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Canvas shadows style={{ width: "100%", height: "100vh" }}>
          <SceneManager onCameraCenter={drawerTrigger} />
          <color attach="background" args={["#e6e2d5"]} />
        </Canvas>
      </div>
      {isDesktopOrLaptop ? (
        <div className="fixed top-0 left-0 z-999">
          <Drawer open={isOpen} onOpenChange={setIsOpen} direction="left">
            <DrawerContent className="z-999 bg-deep-teal h-screen min-w-[425px] w-[425px] rounded-none p-4">
              <DrawerHeader>
                <DrawerTitle className="text-center mb-8">
                  {location?.title}
                </DrawerTitle>
              </DrawerHeader>
              <DrawerDescription />
              <div className="flex justify-center">
                <div className="flex-1 max-w-[425px] pb-8 overflow-y-auto h-[80vh]">
                  <div className="w-full h-96 mb-8  overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_STATIC_FILE}/${
                        location?.main_image
                      }`}
                      className="w-full h-full object-cover "
                      alt=""
                      srcSet=""
                    />
                  </div>
                  <div className="w-full mb-8 text-center">
                    {location?.description}
                  </div>
                  <div className="flex justify-center">
                    <a
                      href={`${import.meta.env.VITE_ROUTE}${
                        location?.routePath
                      }`}
                      target="_blank"
                      className="relative px-10 py-3.5 overflow-hidden group bg-gradient-to-r from-gray-700 to-black hover:bg-gradient-to-r hover:from-gray-600 hover:to-black text-white transition-all ease-out duration-300 "
                    >
                      <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease" />
                      <span className="relative text-xl font-semibold">
                        Explore
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <DrawerFooter></DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      ) : (
        <div className="fixed top-0 left-0 z-999">
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent className="bg-deep-teal z-999">
              <DrawerHeader>
                <DrawerTitle className="text-center mb-8">
                  {location?.title}
                </DrawerTitle>
              </DrawerHeader>
              <div className="flex justify-center">
                <div className="flex-1 max-w-[425px] pb-8 overflow-y-auto h-[80vh]">
                  <div className="w-full h-96 mb-8 overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_STATIC_FILE}/${
                        location?.main_image
                      }`}
                      className="w-full h-full object-cover bg-gray-100 "
                      alt=""
                      srcSet=""
                    />
                  </div>
                  <div className="w-full mb-8 text-center">
                    {location?.description}
                  </div>
                  <div className="flex justify-center">
                    <a
                      href={`${import.meta.env.VITE_ROUTE}${
                        location?.routePath
                      }`}
                      target="_blank"
                      className="relative px-10 py-3.5 overflow-hidden group bg-gradient-to-r from-gray-700 to-black hover:bg-gradient-to-r hover:from-gray-600 hover:to-black text-white transition-all ease-out duration-300 "
                    >
                      <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease" />
                      <span className="relative text-xl font-semibold">
                        Explore
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <DrawerFooter></DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      )}

      <LoadingManager />
    </div>
  );
}

// Configure GLTF loader with Draco support
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.4.1/"
);
GLTFLoader.prototype.setDRACOLoader(dracoLoader);
