import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from '../database/Firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Persistencia de Sesión
  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      setUser(userCredential.user);
      await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));
    } catch (error) {
      console.error("Error en login:", error.message);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Error en logout:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

