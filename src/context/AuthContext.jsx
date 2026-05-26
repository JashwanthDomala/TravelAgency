import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "../firebase/config";

const AuthContext = createContext(null);

const DEMO_USER = {
  uid: "demo-user",
  email: "demo@tripcraft.in",
  displayName: "Demo Traveler",
  photoURL: null,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured() || !auth) {
      const stored = localStorage.getItem("tripcraft_demo_user");
      setUser(stored ? JSON.parse(stored) : null);
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const loginWithGoogle = async () => {
    if (!auth) {
      localStorage.setItem("tripcraft_demo_user", JSON.stringify(DEMO_USER));
      setUser(DEMO_USER);
      return DEMO_USER;
    }
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  };

  const loginWithEmail = async (email, password) => {
    if (!auth) {
      const demo = { ...DEMO_USER, email };
      localStorage.setItem("tripcraft_demo_user", JSON.stringify(demo));
      setUser(demo);
      return demo;
    }
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  };

  const registerWithEmail = async (email, password, displayName) => {
    if (!auth) {
      const demo = { ...DEMO_USER, email, displayName };
      localStorage.setItem("tripcraft_demo_user", JSON.stringify(demo));
      setUser(demo);
      return demo;
    }
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) await updateProfile(result.user, { displayName });
    return result.user;
  };

  const logout = async () => {
    if (!auth) {
      localStorage.removeItem("tripcraft_demo_user");
      setUser(null);
      return;
    }
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, loginWithGoogle, loginWithEmail, registerWithEmail, logout, isConfigured: isFirebaseConfigured() }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
