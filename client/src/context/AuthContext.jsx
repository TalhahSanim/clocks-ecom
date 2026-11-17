import { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { logoutUser } from "../api/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = user !== null;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const snapshot = await getDoc(doc(db, "users", firebaseUser.uid));
        const admin = snapshot.exists() && snapshot.data().admin === true;
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          admin,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  function login(userData) {
    setUser(userData);
  }

  function logout() {
    setUser(null);
    logoutUser();
  }
  const value = {
    user,
    isLoggedIn,
    isLoading, // true until firebase validates it
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
