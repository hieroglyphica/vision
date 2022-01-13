import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import marsImg from "./images/mars-img-nasa-pixel.jpg";
import moonImg from "./images/moon-img-nasa.png";
import venusImg from "./images/venus-img-wiki.jpg";
import "./App.css";

const MarsMesh = () => {
  const base = new THREE.TextureLoader().load(marsImg);
  const ref = useRef();
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.0003));
  return (
    <mesh visible castShadow={false} ref={ref}>
      <directionalLight intensity={0.5} />
      <sphereGeometry attach="geometry" args={[2, 50, 50]} />
      <meshBasicMaterial map={base} color="#D3D3D3" />
    </mesh>
  );
};
const MoonMesh = () => {
  const base = new THREE.TextureLoader().load(moonImg);
  const ref = useRef();
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.0003));
  return (
    <mesh visible castShadow={false} ref={ref}>
      <directionalLight intensity={0.5} />
      <sphereGeometry attach="geometry" args={[2, 50, 50]} />
      <meshBasicMaterial map={base} color="gray" />
    </mesh>
  );
};
const VenusMesh = () => {
  const base = new THREE.TextureLoader().load(venusImg);
  const ref = useRef();
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.001));
  return (
    <mesh visible castShadow={false} ref={ref}>
      <directionalLight intensity={0.5} />
      <sphereGeometry attach="geometry" args={[2, 50, 50]} />
      <meshBasicMaterial map={base} color="#D3D3D3" />
    </mesh>
  );
};
const BoxCover = () => {
  //const base = new THREE.TextureLoader().load(venusImg);
  ///const ref = useRef();
  //useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.001));
  return (
    <mesh visible castShadow={true} position={[2, 0, 0]} rotation={[0, 0, 0]}>
      <directionalLight intensity={0.5} />
      <boxGeometry attach="geometry" args={[4, 4, 4]} />
      <meshBasicMaterial color="white" transparent={true} opacity={0.9} />
    </mesh>
  );
};

function KeyLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[-2, 0, 5]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
}

export default function App() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return (
    <div>
      {/* <Canvas
        className="Canvas"
        style={{ height: window.innerHeight , width: window.innerWidth }}
      >
        <ambientLight />
      
        <BoxCover/>
      </Canvas> */}
      <Canvas
        className="Canvas"
        style={{ height: window.innerHeight, width: window.innerWidth }}
      >
        <ambientLight />
        <OrbitControls />
        <MarsMesh />
      </Canvas>

      {/* <Canvas
        className="Canvas"
        style={{ height: window.innerHeight, width: window.innerWidth }}
      >
        <KeyLight brightness={7.9} color={"white"} />
        <ambientLight />
        <OrbitControls />
        <MoonMesh />
      </Canvas> */}
      {/* <Canvas
        className="Canvas"
        style={{ height: window.innerHeight / 4, width: window.innerWidth }}
      >
        <ambientLight />
        <OrbitControls />
        <VenusMesh />
      </Canvas> */}
    </div>
  );
}
