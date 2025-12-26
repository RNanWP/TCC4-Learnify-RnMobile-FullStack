import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../services/api";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const { user } = route.params || {};

  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!name.trim()) return Alert.alert("Erro", "Nome não pode ser vazio");

    setLoading(true);
    try {
      await api.put("/users", { name });
      Alert.alert("Sucesso", "Perfil atualizado!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <View className="flex-row items-center py-4 border-b border-gray-100 mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-gray-500 text-lg">Cancelar</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 ml-4">
          Editar Perfil
        </Text>
      </View>

      <Text className="text-gray-500 text-sm font-bold uppercase mb-2">
        Nome Completo
      </Text>
      <TextInput
        value={name}
        onChangeText={setName}
        className="bg-gray-100 p-4 rounded-xl text-gray-800 mb-6 border border-gray-200"
      />

      <TouchableOpacity
        onPress={handleSave}
        disabled={loading}
        className="bg-blue-600 p-4 rounded-xl items-center"
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text className="text-white font-bold text-lg">
            Salvar Alterações
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
