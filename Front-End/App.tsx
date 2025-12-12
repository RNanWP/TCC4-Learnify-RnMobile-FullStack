// // Front-End/App.tsx
// import React from "react";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { View, Text } from "react-native";

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <View className="flex-1 items-center justify-center bg-red-500">
//         <Text className="text-white text-2xl font-bold">App subiu! 🎉</Text>
//       </View>
//     </SafeAreaProvider>
//   );
// }

// import "./global.css";
// import React from "react";
// import { StatusBar } from "expo-status-bar";
// import { NavigationContainer } from "@react-navigation/native";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// import { AuthProvider } from "./src/context/AuthContext";
// import Routes from "./src/routes";

// export default function App() {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <StatusBar style="dark" backgroundColor="transparent" translucent />

//         <AuthProvider>
//           <Routes />
//         </AuthProvider>
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }

// import React from "react";
// import { View, Text } from "react-native";

// export default function App() {
//   return (
//     <View className="flex-1 items-center justify-center bg-red-500">
//       <Text className="text-white text-3xl font-bold">NATIVEWIND ON</Text>
//     </View>
//   );
// }

import "./global.css";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "./src/context/AuthContext";
import Routes from "./src/routes";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor="transparent" translucent />
        
        <AuthProvider>
          <Routes />
        </AuthProvider>
        
      </NavigationContainer>
    </SafeAreaProvider>
  );
}