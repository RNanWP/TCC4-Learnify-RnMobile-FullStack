import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  function handleRecover() {
    Alert.alert(
      "E-mail enviado",
      `Se o e-mail ${email} existir, enviaremos um link.`
    );
    navigation.goBack();
  }

  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      <Text className="text-2xl font-bold text-gray-800 mb-2">
        Recuperar Senha
      </Text>
      <Text className="text-gray-500 mb-6">
        Digite seu e-mail para receber as instruções.
      </Text>

      <TextInput
        placeholder="Seu e-mail cadastrado"
        value={email}
        onChangeText={setEmail}
        className="bg-gray-100 p-4 rounded-xl mb-6"
        autoCapitalize="none"
      />

      <TouchableOpacity
        onPress={handleRecover}
        className="bg-blue-600 p-4 rounded-xl items-center"
      >
        <Text className="text-white font-bold">Enviar Link</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="mt-4 items-center"
      >
        <Text className="text-gray-500">Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
