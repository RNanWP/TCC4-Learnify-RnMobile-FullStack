import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";

import StackRoutes from "./stack.routes";
import AuthRoutes from "./auth.routes";

export default function Routes() {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return signed ? <StackRoutes /> : <AuthRoutes />;
}
