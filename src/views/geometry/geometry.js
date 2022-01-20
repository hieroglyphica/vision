import { forwardRef, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, useBox, useSphere, useSpring } from "@react-three/cannon";

const Box = forwardRef((props, ref) => {
  const args = [1, 1, 1];
  useBox(
    () => ({
      args,
      linearDamping: 0.7,
      mass: 1,
      ...props,
    }),
    ref
  );
  return (
    <mesh ref={ref}>
      <boxBufferGeometry args={args} />
      <meshNormalMaterial />
    </mesh>
  );
});

const Ball = forwardRef((props, ref) => {
  const [, { position }] = useSphere(
    () => ({ args: [0.5], type: "Kinematic", ...props }),
    ref
  );
  useFrame(({ mouse: { x, y }, viewport: { height, width } }) =>
    position.set((x * width) / 2, (y * height) / 2, 0)
  );
  return (
    <mesh ref={ref}>
      <sphereBufferGeometry args={[0.5, 64, 64]} />
      <meshNormalMaterial />
    </mesh>
  );
});

const BoxAndBall = () => {
  const box = useRef(null);
  const ball = useRef(null);
  const [, , api] = useSpring(box, ball, {
    damping: 1,
    restLength: 2,
    stiffness: 100,
  });
  const [isDown, setIsDown] = useState(false);

  useEffect(() => api.setRestLength(isDown ? 0 : 2), [isDown]);

  return (
    <group
      onPointerDown={() => setIsDown(true)}
      onPointerUp={() => setIsDown(false)}
    >
      <Box ref={box} position={[1, 0, 0]} />
      <Ball ref={ball} position={[-1, 0, 0]} />
    </group>
  );
};

const style = {
  color: "white",
  fontSize: "1.2em",
  left: 50,
  position: "absolute",
  top: 20,
};

const Geometry = () => {
  return (
    <>
      <Canvas
        style={{ height: "100vh" }}
        camera={{ fov: 50, position: [0, 0, 8] }}
      >
        <color attach="background" args={["#171720"]} />
        <Physics gravity={[0, -40, 0]} allowSleep={false}>
          <BoxAndBall />
        </Physics>
      </Canvas>
      <div style={style}>
        <pre>* click to tighten constraint</pre>
      </div>
    </>
  );
};
export default Geometry;
