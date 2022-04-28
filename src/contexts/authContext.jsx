import { useState, useEffect, createContext } from "react";
import auth from "../auth/configureAuth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  signIn: () => {},
  logout: () => {},
  resetPassword: () => {},
  createUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        setIsInitialized(true);
      } else {
        setIsAuthenticated(false);
        setUser([]);
      }
    });
  }, []);

  const createUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const context = {
    createUser,
    signIn,
    logout,
    resetPassword,
    isInitialized,
    isAuthenticated,
    user,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
