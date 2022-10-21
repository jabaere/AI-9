import { motion } from "framer-motion-3d";
import { MotionConfig } from "framer-motion";
import { useRef, useLayoutEffect } from "react";
import { transition } from "./settings";
import { Canvas, useThree } from "@react-three/fiber";
import { useSmoothTransform } from "./use-smooth-transform";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export function Robots({ isHover, isPress, mouseX, mouseY,positionX,positionY,pozitionZ,path }) {
  const lightRotateX = useSmoothTransform(mouseY, spring, mouseToLightRotation);
  const lightRotateY = useSmoothTransform(mouseX, spring, mouseToLightRotation);

  return (
    <Canvas 
    shadows 
    shadowMap
    dpr={[5, 2]} 
    resize={{ scroll: false, offsetSize: true }}
    style={isHover ? {width: "auto",  height: "300px"} : {width:'auto',height:'auto'}}
    >
      <Camera mouseX={mouseX} mouseY={mouseY} />
      <MotionConfig transition={transition}>
        <motion.group
          center={[0, 0, 0]}
          rotation={[lightRotateX, lightRotateY, 0]}
        >
          <Lights />
        </motion.group>
        <motion.group
          initial={false}
          animate={isHover? "hover" : "rest"}
          dispose={null}
          variants={{
            hover: { z: isPress ? -0.9 : 0 }
          }}
        >
          <Robot position={{positionX,positionY,pozitionZ}} path={path}/>
       </motion.group>
      </MotionConfig>
    </Canvas>
  );
}

export function Lights() {
  return (
    <>
      <spotLight color="white" position={[10, -5, 0]} intensity={0.5} />
      <ambientLight intensity={0.5} />
      <spotLight color="white" position={[-1, -5, 0]} intensity={1.5} />
      <spotLight color="yellow" position={[1, 5, 5]} intensity={0.5} />
      <spotLight color="yellow" position={[-10, -15, 2]} intensity={0.5} />
      <spotLight color="white" position={[-2, -2, 2]} intensity={0.5} />
      <spotLight color="white" position={[4, 4, 0]} intensity={0.5} />
      <spotLight color="white" position={[0, 0, 5]} intensity={1} />
      {/* <spotLight color="#61dafb" position={[-10, 0, 15]} intensity={0.8} />
      <spotLight color="#61dafb" position={[-5, 20, 2]} intensity={0.5} />
      <spotLight color="#f2056f" position={[15, 10, -2]} intensity={2} />
      <spotLight color="#f2056f" position={[15, 10, 5]} intensity={1} />
      <spotLight color="#b107db" position={[5, -10, 5]} intensity={0.8} /> */}
    </>
  );
}

export function Robot({position,path}) {
    const gltf = useLoader(GLTFLoader, path);
    console.log(position)
  return (
    <motion.mesh position={[position.positionX, position.positionY, position.pozitionZ]} variants={{ hover: { z: 2 } }} rotation={[0, 5, 0]} scale={0.3}>
      <primitive object={gltf.scene} dispose={null} />
     
     </motion.mesh>
  );
}






// Adapted from https://github.com/pmndrs/drei/blob/master/src/core/PerspectiveCamera.tsx
function Camera({ mouseX, mouseY, ...props }) {
  const cameraX = useSmoothTransform(mouseX, spring, (x) => x / 350);
  const cameraY = useSmoothTransform(mouseY, spring, (y) => (-1 * y) / 350);

  const set = useThree(({ set }) => set);
  const camera = useThree(({ camera }) => camera);
  const size = useThree(({ size }) => size);
  const scene = useThree(({ scene }) => scene);
  const cameraRef = useRef();

  useLayoutEffect(() => {
    const { current: cam } = cameraRef;
    if (cam) {
      cam.aspect = size.width / size.height;
      cam.updateProjectionMatrix();
    }
  }, [size, props]);

  useLayoutEffect(() => {
    if (cameraRef.current) {
      const oldCam = camera;
      set(() => ({ camera: cameraRef.current }));
      return () => set(() => ({ camera: oldCam }));
    }
  }, [camera, cameraRef, set]);

  useLayoutEffect(() => {
    return cameraX.onChange(() => camera.lookAt(scene.position));
  }, [cameraX]);

  return (
    <motion.perspectiveCamera
      ref={cameraRef}
      fov={90}
      position={[cameraX, cameraY, 3.8]}
    />
  );
}

const spring = { stiffness: 600, damping: 30 };

const mouseToLightRotation = (v) => (-1 * v) / 140;
