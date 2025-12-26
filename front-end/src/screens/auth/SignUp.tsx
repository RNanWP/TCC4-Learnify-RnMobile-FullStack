import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";

export default function SignUp() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (!name || !email || !password)
      return Alert.alert("Erro", "Preencha todos os campos.");

    setLoading(true);
    try {
      await api.post("/users/register", {
        name,
        email,
        password,
        role: "aluno",
      });

      Alert.alert("Sucesso", "Conta criada! Faça login.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Erro ao criar conta.";
      Alert.alert("Falha", msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-6"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mb-6"
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Crie sua conta
          </Text>
          <Text className="text-gray-500 mb-8">
            Comece sua jornada no LearniFyTC.
          </Text>

          <View className="space-y-4">
            <View>
              <Text className="font-bold text-gray-700 mb-2 ml-1">
                Nome Completo
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-gray-800"
                placeholder="Ex: Renan Oliveira"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View>
              <Text className="font-bold text-gray-700 mb-2 ml-1">E-mail</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-gray-800"
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View>
              <Text className="font-bold text-gray-700 mb-2 ml-1">Senha</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-gray-800"
                placeholder="******"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              onPress={handleSignUp}
              disabled={loading}
              className="bg-blue-600 p-4 rounded-xl items-center mt-4"
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text className="text-white font-bold text-lg">Cadastrar</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
