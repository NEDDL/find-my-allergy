import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import auth from "../auth/configureAuth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail as _updateEmail,
  updatePassword as _updatePassword,
} from "firebase/auth";

// Redux
import { fetchId } from "../../src/store/slices/userSlice";
import { useSelector, useDispatch } from "../../src/store/configureStore";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  signIn: () => {},
  logout: () => {},
  resetPassword: () => {},
  createUser: () => {},
  updateEmail: () => {},
  updatePassword: () => {},
});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(fetchId(user.uid));
        setIsAuthenticated(true);
        setUser(user);
        setIsInitialized(true);
      } else {
        setIsAuthenticated(false);
        setUser([]);
        setIsInitialized(true);
      }
    });
  }, []);

  const createUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
      setIsInitialized(false);
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateEmail = async (email) => {
    return await _updateEmail(auth.currentUser, email);
  };
  const updatePassword = async (password) => {
    return await _updatePassword(auth.currentUser, password);
  };

  const context = {
    createUser,
    signIn,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    isInitialized,
    isAuthenticated,
    user,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
