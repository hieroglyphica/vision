import * as React from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import ResponsiveAppBar from "./components/navbar";
import MoonPhaseAngle from "./views/ephemerid/moonphase";
import { AuthProvider, useAuth } from "./auth/auth";
import LoginPage from "./views/login/login";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          />
          <Route
            path="/moonPhase"
            element={
              <RequireAuth>
                <MoonPhaseAngle />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
function Layout() {
  const pages = [
    // { name: "Lunar Eclipses", link: "lunarEclipses" },
    // { name: "Moon Quarters", link: "moonQuarter" },
    { name: "Moon Phase", link: "moonPhase" },
    { name: "Home", link: "/" },
  ];
  return (
    <div>
      <ResponsiveAppBar pages={pages} />
      <AuthStatus />
      <Outlet />
    </div>
  );
}

const AuthStatus = () => {
  let auth = useAuth;
  let navigate = useNavigate();
  console.log(auth.user, "testing");
  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
};

const RequireAuth = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}
