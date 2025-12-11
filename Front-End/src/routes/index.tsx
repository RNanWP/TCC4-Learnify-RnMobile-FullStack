import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

export default function Routes() {
  const { signed, loading } = useAuth();

  if (loading) {
    // Tela de Splash Screen simples enquanto verifica o token
    return (
      <View className="flex-1 justify-center items-center bg-blue-600">
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
