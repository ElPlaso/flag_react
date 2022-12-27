import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.uid) {
        setUid(currentUser.uid);
      }
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  const value = { googleSignIn, logOut, user, uid };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
