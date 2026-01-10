import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,} from "firebase/auth";

import { auth } from "../services/firebase";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ REGISTER
  const register = async (email, password, name) => {
    try {
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // ✅ Create MongoDB user immediately
      const token = await firebaseUser.getIdToken();
      const { data } = await api.post("/auth/register", {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        name: name || email.split("@")[0],
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // ✅ LOGIN
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ LOGOUT
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // ✅ AUTH STATE LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken(true);
          const { data } = await api.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth sync failed", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);