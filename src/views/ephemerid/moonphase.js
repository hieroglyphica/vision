import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import "./moon.css";
import moonImgNasa from "../../images/moon-img-nasa_8k.png";
import * as Astronomy from "./../../library/equations/astronomy";
import {
  phaseAngleState,
  illuminationState,
  nextMoonQuarterState,
} from "./vectorstate";
import {
  RecoilBridge,
  RecoilRoot,
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
} from "recoil";
import {
  Typography,
  Card,
  Box,
  CardActions,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  ListSubheader,
  Paper,
} from "@mui/material";
import { FormatDate } from "../../utilities/formatDate";
import circleImg from "../../images/circle.png";
import dataSet from "../../library/exoplanetdata/exoplanet.json";

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
const PhaseIllumination = () => {
  const [illumination, setIllumination] = useRecoilState(illuminationState);
  const [phaseAngle, setPhaseAngle] = useRecoilState(phaseAngleState);
  const [nextMoonQuarter, setNextMoonQuarter] =
    useRecoilState(nextMoonQuarterState);

  useEffect(() => {
    const interval = setInterval(() => {
      const dateNow = new Date();
      setIllumination(Astronomy.Illumination("Moon", dateNow).phase_fraction);
      setPhaseAngle(Astronomy.MoonPhase(dateNow));
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <Paper
      style={{
        color: "#ff7700",
        paddingTop: "10vh",
        backgroundColor: "black",
        overflow: "auto",
        minWidth: "20%",
      }}
    >
      <Card sx={{ minWidth: 275, maxHeight: "87vh" }}>
        <CardContent>
          <Typography
            border="2px"
            borderColor="black"
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Current Moon Illumination
          </Typography>
          <Typography variant="h5" component="div">
            {(illumination * 100).toFixed(2)} %
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Current Moon Phase Angle
          </Typography>
          <Typography variant="h5" component="div">
            {phaseAngle.toFixed(5)}
          </Typography>

          <Typography variant="h5" component="div">
            {/* {nextMoonQuarter} */}
            <MoonQuarterPhases />
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
          <Typography variant="body2">
            This application uses an 8k image from NASA's Scientific
            Visualization Studio at https://svs.gsfc.nasa.gov/4720. The future
            version of this will attempt using a displacement map thereby giving
            the moon a more three dimensional surface texture and terrain.
            Three.js fiber and React are used to map this image onto a sphere.
            When the page first loads the moon shows in its approximate
            illumination. The illumination phase angle and other astronomical
            calculations are done using cosinekittys astronomy engine which is
            based on a truncated VSOP87 or the semi-analytic planetary theory
            VSOP (French: Variations Séculaires des Orbites Planétaires) and
            claims accuracy within 1 arcminute of results from NOVAS
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Paper>
  );
};
const MoonQuarterPhases = () => {
  let lunarArray = [];
  const date = new Date();
  const phase = Astronomy.MoonPhase(date);

  const QuarterName = [
    "New Moon",
    "First Quarter",
    "Full Moon",
    "Third Quarter",
  ];
  let mq;
  for (let i = 0; i < 10; ++i) {
    if (mq === undefined) {
      mq = Astronomy.SearchMoonQuarter(date);
    } else {
      mq = Astronomy.NextMoonQuarter(mq);
    }
    lunarArray.push({
      time: FormatDate(mq.time.date),
      quarter: QuarterName[mq.quarter],
    });
  }

  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Upcoming Quarters
        </ListSubheader>
      }
      style={{ overflow: "auto" }}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {Object.keys(lunarArray).map((quarter, key) => {
        return (
          <>
            <ListItem alignItems="flex-start" key={key}>
              <ListItemText
                primary={lunarArray[quarter].quarter}
                key={key}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {lunarArray[quarter].time}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      })}
    </List>
  );
};
const MoonQuarterPhasesCanvas = () => {
  let lunarArray = [];
  const date = new Date();
  const phase = Astronomy.MoonPhase(date);

  const QuarterName = [
    "New Moon",
    "First Quarter",
    "Full Moon",
    "Third Quarter",
  ];
  let mq;
  for (let i = 0; i < 10; ++i) {
    if (mq === undefined) {
      mq = Astronomy.SearchMoonQuarter(date);
    } else {
      mq = Astronomy.NextMoonQuarter(mq);
    }
    lunarArray.push({
      time: FormatDate(mq.time.date),
      quarter: QuarterName[mq.quarter],
    });
  }

  return phase;
};
const CanvasData = () => {
  const [illumination, setIllumination] = useRecoilState(illuminationState);
  const [phaseAngle, setPhaseAngle] = useRecoilState(phaseAngleState);
  const [nextMoonQuarter, setNextMoonQuarter] =
    useRecoilState(nextMoonQuarterState);

  useEffect(() => {
    const interval = setInterval(() => {
      const dateNow = new Date();
      setIllumination(Astronomy.Illumination("Moon", dateNow).phase_fraction);
      setPhaseAngle(Astronomy.MoonPhase(dateNow));
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    // <div style={{ color: "white", paddingTop: "10vh" }}>
    //   {illumination.toFixed(3)}{" "}
    // </div>
    <group>
      <Text
        color="white"
        fontSize={0.1}
        text={phaseAngle.toFixed(3)}
        position={[-1.5, 0, 2]}
      />
      <Text
        color="white"
        fontSize={0.1}
        text={(illumination * 100).toFixed(2) + "%"}
        position={[-1.5, 1, 2]}
      />
      {/* prettier-ignore */}
      <Text
      color="white"
      fontSize={.1}
       position={[2.5, 0, 2]}
       maxWidth={2}
 
       text={"  This application uses an 8k image from NASA's Scientific Visualization Studio at https://svs.gsfc.nasa.gov/4720. The future version of this will attempt using a displacement map thereby giving the moon a more three dimensional surface texture and terrain. Three.js fiber and React are used to map this image onto a sphere. When the page first loads the moon shows in its approximate illumination. The illumination phase angle and other astronomicalcalculations are done using cosinekittys astronomy engine which is based on a truncated VSOP87 or the semi-analytic planetary theory VSOP (French: Variations Séculaires des Orbites Planétaires) and claims accuracy within 1 arcminute of results from NOVAS"}
    />
    </group>
  );
};
const DataComponent = () => {
  const data = CanvasData();
  return data;
};
function Stars({ count = 5000 }) {
  const imgTex = useLoader(THREE.TextureLoader, circleImg);

  const positions = useMemo(() => {
    let positions = [];
    for (let i = 0; i < count; i++) {
      positions.push(
        Math.random() * 10 * (Math.round(Math.random()) ? -40 : 40)
      );
      positions.push(
        Math.random() * 10 * (Math.round(Math.random()) ? -40 : 40)
      );
      positions.push(
        Math.random() * 10 * (Math.round(Math.random()) ? -40 : 40)
      );
    }
    return new Float32Array(positions);
  }, [count]);
  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      {/* <pointsMaterial
        attach="material"
        size={1}
        sizeAttenuation
        color="white"
        transparent
        opacity={0.8}
      /> */}
      <pointsMaterial
        attach="material"
        map={imgTex}
        color={"white"}
        size={0.5}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
      />
    </points>
  );
}

export default function MoonPhaseAngle() {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  return (
    <div className="container">
      {/* <RecoilRoot className="left">
        <PhaseIllumination />
      </RecoilRoot> */}

      <div className="right">
        <Canvas
          style={{
            height: window.innerHeight,
            width: window.innerWidth,
          }}
          className="Canvas"
        >
          <RecoilRoot>
            <Suspense fallback={null}>
              <Stars />
            </Suspense>
            <DataComponent />
            <AmbientLight />
            <OrbitControls />
            <MoonMeshPhase />
            <SunLight />
          </RecoilRoot>
        </Canvas>
      </div>
    </div>
  );
}
