import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Feed from "../screens/home/Feed";
import CreatePost from "../screens/post/CreatePost";
import Profile from "../screens/profile/Profile";

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: "#FFF",
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6",
        },
      }}
    >
      {/* Rota 1: Feed (Home) */}
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      {/* Rota 2: Criar Post */}
      <Tab.Screen
        name="Create"
        component={CreatePost}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" color={color} size={32} />
          ),
        }}
      />

      {/* Rota 3: Perfil */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
