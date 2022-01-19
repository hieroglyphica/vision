import * as React from "react";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import ResponsiveAppBar from "./components/navbar";
import MoonPhaseAngle from "./views/ephemerid/moonphase";
import { AuthProvider, useAuth } from "./auth/auth";
import LoginPage from "./views/login/login";
import Landing from "./views/login/landing";
import PhoneAnimation from "./views/phoneanimation/talkingonphone";
import ThreeFabric from "./views/rippleanimation/rippleanimation";

const RequireAuth = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
function Layout() {
  const pages = [
    // { name: "Lunar Eclipses", link: "lunarEclipses" },
    // { name: "Moon Quarters", link: "moonQuarter" },
    { name: "Home", link: "/" },
    { name: "Moon Phase", link: "moonPhase" },
    { name: "Animation", link: "/phoneAnimation" },
    { name: "Fabric", link: "/rippleAnimation" },
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
}

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
        </Route>
      </Routes>
    </AuthProvider>
  );
};
export default App;
