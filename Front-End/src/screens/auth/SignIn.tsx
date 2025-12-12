import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function SignIn() {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);

  async function handleSignIn() {
    if (!email || !password) {
      Alert.alert("Campos vazios", "Por favor, preencha e-mail e senha.");
      return;
    }

    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert(
        "Falha no Login",
        "Verifique suas credenciais. (Dica: Use o admin.comment@teste.com / 123)"
      );
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-8"
      >
        {/* --- CABEÇALHO --- */}
        <View className="items-center mb-12">
          <View className="bg-blue-50 w-20 h-20 rounded-2xl items-center justify-center mb-4">
            <Ionicons name="book-outline" size={40} color="#3B82F6" />
          </View>

          <Text className="text-4xl font-bold text-gray-900">
            LearniFy<Text className="text-blue-600">TC</Text>
          </Text>
          <Text className="text-gray-500 text-center mt-2 text-base">
            Sua plataforma educacional para aprender e compartilhar.
          </Text>
        </View>

        {/* --- FORMULÁRIO --- */}
        <View className="space-y-5">
          <View>
            <Text className="text-gray-700 font-semibold mb-2 ml-1">
              E-mail
            </Text>
            <View className="flex-row items-center border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus:border-blue-500">
              <Ionicons
                name="mail-outline"
                size={20}
                color="#9CA3AF"
                style={{ marginRight: 10 }}
              />
              <TextInput
                className="flex-1 text-gray-800 text-base"
                placeholder="seu@email.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Input Senha */}
          <View>
            <Text className="text-gray-700 font-semibold mb-2 ml-1">Senha</Text>
            <View className="flex-row items-center border border-gray-200 bg-gray-50 rounded-xl px-4 py-3">
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#9CA3AF"
                style={{ marginRight: 10 }}
              />
              <TextInput
                className="flex-1 text-gray-800 text-base"
                placeholder="Sua senha secreta"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={isSecure}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                <Ionicons
                  name={isSecure ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="items-end mt-2">
              <Text className="text-blue-600 font-medium">Esqueci a senha</Text>
            </TouchableOpacity>
          </View>

          {/* Botão Principal (Gradiente Simulado com Sombra) */}
          <TouchableOpacity
            className="bg-blue-600 rounded-xl py-4 items-center shadow-lg shadow-blue-200 mt-4 active:bg-blue-700"
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text className="text-white font-bold text-lg">Entrar</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* --- RODAPÉ (Cadastro) --- */}
        <View className="flex-row justify-center mt-10">
          <Text className="text-gray-500">Não tem uma conta? </Text>
          <TouchableOpacity>
            <Text className="text-blue-600 font-bold">Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { useAuth } from "../../context/AuthContext";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";

// export default function SignIn() {
//   const { signIn, loading } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isSecure, setIsSecure] = useState(true);

//   async function handleSignIn() {
//     if (!email || !password) {
//       Alert.alert("Atenção", "Preencha todos os campos");
//       return;
//     }

//     try {
//       await signIn(email, password);
//     } catch (error) {
//       Alert.alert(
//         "Erro no Login",
//         "Verifique suas credenciais e tente novamente."
//       );
//     }
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-background">
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         className="flex-1 justify-center px-6"
//       >
//         {/* LOGO / CABEÇALHO */}
//         <View className="items-center mb-10">
//           {/* Ícone representando o Logo */}
//           <Ionicons name="book" size={64} color="#3B82F6" />
//           <Text className="text-3xl font-bold text-blue-600 mt-4">
//             Lingroom<Text className="text-secondary">TC</Text>
//           </Text>
//           <Text className="text-gray-500 mt-2 text-center">
//             Sua comunidade de aprendizado mobile
//           </Text>
//         </View>

//         {/* FORMULÁRIO */}
//         <View className="space-y-4">
//           <View>
//             <Text className="text-gray-700 mb-2 font-medium">E-mail</Text>
//             <TextInput
//               className="bg-white border border-gray-300 rounded-xl p-4 text-gray-800"
//               placeholder="exemplo@teste.com"
//               placeholderTextColor="#9CA3AF"
//               keyboardType="email-address"
//               autoCapitalize="none"
//               value={email}
//               onChangeText={setEmail}
//             />
//           </View>

//           <View>
//             <Text className="text-gray-700 mb-2 font-medium">Senha</Text>
//             <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-4">
//               <TextInput
//                 className="flex-1 py-4 text-gray-800"
//                 placeholder="Sua senha secreta"
//                 placeholderTextColor="#9CA3AF"
//                 secureTextEntry={isSecure}
//                 value={password}
//                 onChangeText={setPassword}
//               />
//               <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
//                 <Ionicons
//                   name={isSecure ? "eye-off" : "eye"}
//                   size={24}
//                   color="#9CA3AF"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* BOTÃO DE AÇÃO (UX: Feedback de Loading) */}
//           <TouchableOpacity
//             className="bg-blue-600 rounded-xl py-4 items-center mt-6 shadow-md shadow-blue-300"
//             onPress={handleSignIn}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#FFF" />
//             ) : (
//               <Text className="text-white font-bold text-lg">Entrar</Text>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity className="mt-4 items-center">
//             <Text className="text-blue-500 font-medium">
//               Esqueci minha senha
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }
