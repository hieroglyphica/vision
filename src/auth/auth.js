import React, { useContext, useState, createContext } from "react";

export const AuthContext = createContext({
  signin: () => {},
  signout: () => {},
  loggedIn: false,
  user: "",
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    loggedIn: false,
    user: "",
  };

  const [loggedIn, setLoggedIn] = useState(initialState.loggedIn);
  const [user, setUser] = useState(initialState.user);

  const handleLogin = (email, password) => {
    setLoggedIn(true);
    setUser(email);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser("");
  };

  const contextValues = {
    signin: handleLogin,
    signout: handleLogout,
    loggedIn,
    user,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};
