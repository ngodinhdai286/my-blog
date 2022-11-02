import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { auth } from "../firebase/firebase-config";

const AuthContext = createContext();

function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const value = { userInfo, setUserInfo };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserInfo(user);
    });
  }, []);

  return <AuthContext.Provider {...props} value={value}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("useAuth must be used within authProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
