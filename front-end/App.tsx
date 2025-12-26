import "./global.css";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, Platform } from "react-native";

import { AuthProvider } from "./src/context/AuthContext";
import Routes from "./src/routes";

export default function App() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-gray-200">
        <StatusBar style="auto" />
        <View
          className={`flex-1 w-full ${
            Platform.OS === "web"
              ? "max-w-[480px] mx-auto bg-white shadow-xl h-full"
              : ""
          }`}
        >
          <NavigationContainer>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </NavigationContainer>
        </View>
      </View>
    </SafeAreaProvider>
  );
}
