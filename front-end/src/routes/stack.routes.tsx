import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppRoutes from "./app.routes";
import PostDetails from "../screens/home/PostDetails";
import EditPost from "../screens/post/EditPost";
import AdminDashboard from "../screens/admin/AdminDashboard";
import EditProfile from "../screens/profile/EditProfile";
import UserList from "../screens/admin/UserList";
import AdminPosts from "../screens/admin/AdminPosts";
import AdminUsers from "../screens/admin/AdminUsers";
import AdminComments from "@/screens/admin/AdminComments";
import EditUser from "../screens/admin/EditUser";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={AppRoutes} />
      <Stack.Screen name="EditPost" component={EditPost} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="AdminPosts" component={AdminPosts} />
      <Stack.Screen name="AdminUsers" component={AdminUsers} />
      <Stack.Screen name="AdminComments" component={AdminComments} />

      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="UserList" component={UserList} />
      <Stack.Screen name="EditUser" component={EditUser} />

      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{
          headerShown: false,
          title: "Detalhes do Post",
          headerTintColor: "#3B82F6",
        }}
      />
    </Stack.Navigator>
  );
}
