import { useState, useContext, createContext } from "react";

export const AuthContext = createContext({
  signin: () => {},
  signout: () => {},
  user: "",
  loggedIn: false,
  userName: "",
});
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    loggedIn: false,
    user: "",
  };
  const [user, setUser] = useState(initialState.user);

  const signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  const contextValues = {
    user,
    signin: signin,
    signout: signout,
  };

  // let value = { user, signin, signout };

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
