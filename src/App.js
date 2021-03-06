import * as React from "react";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import ResponsiveAppBar from "./components/navbar";
import MoonPhaseAngle from "./views/ephemerid/moonphase";
import { AuthProvider, useAuth } from "./auth/auth";
import LoginPage from "./views/login/login";
import Landing from "./views/login/landing";
import PhoneAnimation from "./views/phoneanimation/talkingonphone";
import ThreeFabric from "./views/rippleanimation/rippleanimation";
import ThreeSphere from "./views/sphere/sphere";
import Geometry from "./views/geometry/geometry";
import BubbleAnimation from "./views/bubbleanimation/bubble";
import GeoMap from "./views/geomaps/streetmap";
import ExoPlanetData from "./views/exoplanets/planets";
import XorBitwise from "./views/xorbitwise/xorbitwise";

const RequireAuth = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
const Layout = () => {
  const pages = [
    // { name: "Lunar Eclipses", link: "lunarEclipses" },
    // { name: "Moon Quarters", link: "moonQuarter" },
    { name: "Home", link: "/" },
    { name: "Moon Phase", link: "moonPhase" },
    { name: "Sphere", link: "/sphereAnimation" },
    { name: "Street Map", link: "/geoMap" },
    { name: "Fabric", link: "/rippleAnimation" },
    { name: "XOR Bitwise", link: "/xorbitwise" },
    // { name: "Animation", link: "/phoneAnimation" },
    // { name: "Geometry", link: "/geometryPhysics" },
    // { name: "Bubble", link: "/bubbleAnimation" },
    // { name: "Exo Planets", link: "/exoPlanets" },
  ];
  const settings = [
    { name: "Account", link: "/account" },
    { name: "Settings", link: "/settings" },
  ];
  return (
    <div>
      <ResponsiveAppBar pages={pages} settings={settings} />
      <Outlet />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/moonPhase"
            element={
              <RequireAuth>
                <MoonPhaseAngle />
              </RequireAuth>
            }
          />
          <Route
            path="/phoneAnimation"
            element={
              <RequireAuth>
                <PhoneAnimation />
              </RequireAuth>
            }
          />
          <Route
            path="/rippleAnimation"
            element={
              <RequireAuth>
                <ThreeFabric />
              </RequireAuth>
            }
          />
          <Route
            path="/sphereAnimation"
            element={
              <RequireAuth>
                <ThreeSphere />
              </RequireAuth>
            }
          />
          <Route
            path="/geometryPhysics"
            element={
              <RequireAuth>
                <Geometry />
              </RequireAuth>
            }
          />
          <Route
            path="/bubbleAnimation"
            element={
              <RequireAuth>
                <BubbleAnimation />
              </RequireAuth>
            }
          />
          <Route
            path="/geoMap"
            element={
              <RequireAuth>
                <GeoMap />
              </RequireAuth>
            }
          />
          <Route
            path="/exoPlanets"
            element={
              <RequireAuth>
                <ExoPlanetData />
              </RequireAuth>
            }
          />
          <Route
            path="/xorbitwise"
            element={
              <RequireAuth>
                <XorBitwise />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
};
export default App;
