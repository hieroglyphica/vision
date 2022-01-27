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
  return <ambientLight color={"gray"} intensity={0.2} />;
}
const SunLight = () => {
  const [lightX, setLightX] = useState(-7);
  const [lightZ, setLightZ] = useState(-15);
  const [intensity, setIntesity] = useState(0.6);

  useEffect(() => {
    const interval = setInterval(() => {
      // "2022-01-31 17:20:16"
      const date = new Date();
      let phase = Astronomy.MoonPhase(date);
      let illumination = Astronomy.Illumination("Moon", date);

      if (phase <= 180) {
        let percentage = illumination.phase_fraction;
        let posistionV = percentage * 9;
        let position = -8.5 + posistionV;

        if (phase >= 135) {
          posistionV = percentage * 55;
          position = -37 + posistionV;
        }

        if (phase > 90 && phase < 135) {
          posistionV = percentage * 7;
          position = 0 + posistionV;
        }

        setLightX(7);
        setLightZ(position);
      }
      if (phase > 180) {
        setLightX(-7);
        let percentage = illumination.phase_fraction;
        let positionV = percentage * 32;
        let position = -16 + positionV;

        if (phase > 270) {
          positionV = percentage * 10;
          position = -5 + positionV;
        }

        setLightZ(position);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <pointLight
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
