import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const FeedScreen = () => (
  <View className="flex-1 justify-center items-center bg-white">
    <Text>Feed</Text>
  </View>
);
const CreateScreen = () => (
  <View className="flex-1 justify-center items-center bg-white">
    <Text>Criar</Text>
  </View>
);
const ProfileScreen = () => (
  <View className="flex-1 justify-center items-center bg-white">
    <Text>Perfil</Text>
  </View>
);

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
