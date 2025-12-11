import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import api from "../services/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "aluno" | "professor" | "administrador";
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      // Tenta recuperar token e usuário salvos no celular
      const storedUser = await SecureStore.getItemAsync("user_data");
      const storedToken = await SecureStore.getItemAsync("user_token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        api.defaults.headers.Authorization = `Bearer ${storedToken}`;
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(email: string, pass: string) {
    const response = await api.post("/users/login", {
      email,
      password: pass,
    });

    const { user, token } = response.data;

    // Salva no dispositivo
    await SecureStore.setItemAsync("user_token", token);
    await SecureStore.setItemAsync("user_data", JSON.stringify(user));

    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(user);
  }

  async function signOut() {
    await SecureStore.deleteItemAsync("user_token");
    await SecureStore.deleteItemAsync("user_data");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
