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
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const navigation = useNavigation<any>();
  const { signIn } = useAuth();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);

  async function handleSignIn() {
    if (!email || !password) {
      return Alert.alert("Campos vazios", "Preencha todos os campos.");
    }

    setIsLoggingIn(true);

    try {
      await signIn(email, password);
    } catch (error) {
      setIsLoggingIn(false);
      console.log("Erro no Login:", error);
      Alert.alert("Erro de Acesso", "E-mail ou senha incorretos.");
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-8"
      >
        {/* LOGO E TÍTULO */}
        <View className="items-center mb-12">
          <View className="bg-blue-50 p-4 rounded-2xl mb-4">
            <Ionicons name="book-outline" size={48} color="#3B82F6" />
          </View>

          <Text className="text-4xl font-bold text-gray-900">
            LearniFy<Text className="text-blue-600">TC</Text>
          </Text>
          <Text className="text-gray-500 mt-2 text-base">
            Sua plataforma educacional.
          </Text>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 font-bold mb-2 ml-1">E-mail</Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-white">
              <Ionicons
                name="mail-outline"
                size={20}
                color="#9CA3AF"
                style={{ marginRight: 10 }}
              />
              <TextInput
                className="flex-1 text-gray-800 text-base"
                placeholder="seu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View>
            <Text className="text-gray-700 font-bold mb-2 ml-1">Senha</Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-white">
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#9CA3AF"
                style={{ marginRight: 10 }}
              />
              <TextInput
                className="flex-1 text-gray-800 text-base"
                placeholder="Sua senha"
                secureTextEntry={isSecure}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                <Ionicons
                  name={isSecure ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className="items-end mt-2"
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text className="text-blue-600 font-bold text-sm">
                Esqueci a senha
              </Text>
            </TouchableOpacity>
          </View>

          {/* BOTÃO ENTRAR */}
          <TouchableOpacity
            className={`rounded-xl py-4 items-center mt-6 ${
              isLoggingIn ? "bg-blue-400" : "bg-blue-600"
            }`}
            onPress={handleSignIn}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text className="text-white font-bold text-lg">Entrar</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-10">
          <Text className="text-gray-500">Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-blue-600 font-bold">Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
