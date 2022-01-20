import "./sphere.css";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import circleImg from "../../images/circle.png";
import { Suspense, useCallback, useMemo, useRef } from "react";
import image1 from "../../images/space5.jpg";

function Points() {
  const imgTex = useLoader(THREE.TextureLoader, circleImg);
  const bufferRef = useRef();
  let colorArray = [
    "yellow",
    "red",
    "darkgoldenrod",
    "goldenrod",
    "pink",
    "purple",
  ];
  let random = Math.random(0, 5).toFixed(0);

  let t = 0;
  let f = 0.002;
  let a = 0.7;
  const graph = useCallback(
    (x, z) => {
      return Math.cos(f * (x ** 2 + z ** 2 + t)) * a;
    },
    [t, f, a]
  );

  let v = new THREE.Vector3();

  function randomPointInSphere(radius) {
    const x = THREE.Math.randFloat(-1, 1);
    const y = THREE.Math.randFloat(-1, 1);
    const z = THREE.Math.randFloat(-1, 1);
    const normalizationFactor = Math.sqrt(5 / (x ** 2 + y ** 2 + z ** 2));

    v.x = x * normalizationFactor * radius;
    v.y = y * normalizationFactor * radius;
    v.z = z * normalizationFactor * radius;

    return v;
  }

  const count = 300;
  const sep = 2;
  let positions = useMemo(() => {
    let positions = [];
    for (var i = 0; i < 50000; i++) {
      var vertex = randomPointInSphere(35);
      positions.push(vertex.x, vertex.y, vertex.z);
    }

    return new Float32Array(positions);
  }, [count, sep, graph]);

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          ref={bufferRef}
          attachObject={["attributes", "position"]}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        attach="material"
        map={imgTex}
        color={"purple"}
        size={0.5}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
      />
    </points>
  );
}

function AnimationCanvas() {
  return (
    <Canvas colorManagement={false} camera={{ position: [0, 147, 0], fov: 75 }}>
      <Suspense fallback={null}>
        <Points />
      </Suspense>
      <OrbitControls autoRotate={true} autoRotateSpeed={0.2} />
    </Canvas>
  );
}

function ThreeSphere() {
  return (
    <div className="anim">
      <div
        id="info"
        style={{
          backgroundImage: `url(${image1})`,
        }}
      ></div>
      <Suspense fallback={<div>Loading...</div>}>
        <AnimationCanvas />
      </Suspense>
    </div>
  );
}

export default ThreeSphere;
