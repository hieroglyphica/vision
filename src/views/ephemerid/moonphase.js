import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./moon.css";
import moonImgNasa from "../../images/moon-img-nasa_8k.png";
import * as Astronomy from "./../../library/equations/astronomy";

const MoonMeshPhase = () => {
  const base = new THREE.TextureLoader().load(moonImgNasa);
  return (
    <mesh position={[0, 0, 0]} rotation={[0.45, -1.4, 0.51]}>
      <sphereGeometry attach="geometry" args={[2, 32, 32]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        roughness={0}
        metalness={0}
        map={base}
      />
    </mesh>
  );
};
function AmbientLight({}) {
  return <ambientLight color={"gray"} intensity={0.1} />;
}
const SunLight = () => {
  let phase;

  const [lightX, setLightX] = useState(-7);
  const [lightZ, setLightZ] = useState(-15);
  const [intensity, setIntesity] = useState(0.7);

  useEffect(() => {
    const interval = setInterval(() => {
      // "2022-01-31 17:20:16"
      const date = new Date();
      phase = Astronomy.MoonPhase(date);
      if (phase <= 180) {
        let percentage = phase / 180;
        let posistionV = percentage * 10;
        let position = -5 + posistionV;

        if (phase > 90) {
          posistionV = percentage * 34;
          position = -17 + posistionV;
        }

        setLightX(7);
        setLightZ(position);
      }
      if (phase > 180) {
        setLightX(-7);
        let percentage = (phase - 180) / 180;
        let positionV = percentage * 32;
        let position = 16 - positionV;

        setLightZ(position);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <directionalLight
      color={"white"}
      intensity={intensity}
      position={[lightX, 0, lightZ]}
      lookAt={[0, 0, 0]}
    />
  );
};

export default function MoonPhaseAngle() {
  return (
    <div>
      <Canvas
        className="Canvas"
        style={{ height: window.innerHeight, width: window.innerWidth }}
      >
        <AmbientLight />
        <OrbitControls />
        <MoonMeshPhase />
        <SunLight />
      </Canvas>
    </div>
  );
}
