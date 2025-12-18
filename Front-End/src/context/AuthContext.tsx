import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import api from "../services/api";

interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "aluno" | "professor" | "administrador";
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signOut: () => void;
  updateUser: (userData: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
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

  async function updateUser(userData: User) {
    setUser(userData);
    await SecureStore.setItemAsync("user_data", JSON.stringify(userData));
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
