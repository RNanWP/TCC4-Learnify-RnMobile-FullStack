import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppRoutes from "./app.routes";
import PostDetails from "../screens/home/PostDetails";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={AppRoutes} />

      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{
          headerShown: true,
          title: "Detalhes do Post",
          headerTintColor: "#3B82F6",
        }}
      />
    </Stack.Navigator>
  );
}
