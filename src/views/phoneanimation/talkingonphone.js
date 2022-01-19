import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Phone from "../../library/animation/Phone";
import { OrbitControls } from "@react-three/drei";
import "./animationstyles.css";

const PhoneAnimation = () => {
  return (
    <div style={{ height: window.innerHeight }}>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} />
        <Suspense fallback={null}>
          <Phone />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PhoneAnimation;
