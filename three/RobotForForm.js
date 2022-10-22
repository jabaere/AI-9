import React, { useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
export function RobotForForm({
  children,
  modelPath,
  positionY,
  positionX,
  positionZ,
  ref,
  scale,
  ...props
}) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const { viewport, camera, mouse } = useThree();
  const sceneRef = useRef();
  const vec = new THREE.Vector3();
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    // sceneRef.current.rotation.x = -Math.PI / 1.75 + Math.cos(time / 4) / 8
    sceneRef.current.rotation.y = Math.sin(time / 4) / 6;
    // sceneRef.current.rotation.z = (1 + Math.sin(time / 1.5)) / 20
    sceneRef.current.position.y = (1 + Math.sin(time / 1.5)) / 4;

    // sceneRef.current.position.x = sceneRef.current.position + 0.1 ;

    // camera.position.lerp(vec.set(mouse.x / 7, mouse.y * 2, 7.5), 0.02);
    //camera.rotation.x=sceneRef.current.rotation.x * 9 - 0.3
    //camera.rotation.z=sceneRef.current.rotation.z * 2 - 0.8
    //camera.
  });

  return (
    <group
      position={[positionX, positionY, positionZ]}
      scale={viewport.width / scale}
      ref={sceneRef}
      {...props}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 0]} />
      <spotLight color="white" position={[1, 5, 0]} intensity={1} />
      <spotLight color="yellow" position={[1, 5, 5]} intensity={0.5} />
      <mesh rotation={[-0.2, 0.5, 0]}>
        <primitive object={gltf.scene} dispose={null} />
      </mesh>
      {/* remove castShadow receiveShadow */}
      <mesh castShadow receiveShadow />
    </group>
  );
}
