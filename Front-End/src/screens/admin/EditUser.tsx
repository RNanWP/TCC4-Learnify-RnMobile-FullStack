import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function EditUser() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { user } = route.params;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    if (!name || !email) {
      return Alert.alert("Atenção", "Preencha todos os campos.");
    }

    setLoading(true);
    try {
      await api.put(`/users/${user._id}`, {
        name,
        email,
        role,
      });

      Alert.alert("Sucesso", "Usuário atualizado com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o usuário.");
    } finally {
      setLoading(false);
    }
  }

  const RoleOption = ({ title, value, color }: any) => (
    <TouchableOpacity
      onPress={() => setRole(value)}
      className={`flex-row items-center p-4 mb-2 rounded-xl border ${
        role === value
          ? `bg-${color}-50 border-${color}-500`
          : "bg-white border-gray-200"
      }`}
    >
      <View
        className={`w-5 h-5 rounded-full border-2 mr-3 justify-center items-center ${
          role === value ? `border-${color}-500` : "border-gray-300"
        }`}
      >
        {role === value && (
          <View className={`w-2.5 h-2.5 rounded-full bg-${color}-500`} />
        )}
      </View>
      <Text
        className={`font-bold ${
          role === value ? `text-${color}-700` : "text-gray-600"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center p-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Editar Usuário</Text>
      </View>

      <ScrollView className="p-5">
        <Text className="text-gray-500 font-bold mb-2">Nome Completo</Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-5 text-gray-800"
          value={name}
          onChangeText={setName}
          placeholder="Ex: João Silva"
        />
        <Text className="text-gray-500 font-bold mb-2">E-mail</Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-5 text-gray-800"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text className="text-gray-500 font-bold mb-3">Nível de Acesso</Text>

        <RoleOption title="Aluno" value="aluno" color="green" />
        <RoleOption title="Professor" value="professor" color="blue" />
        <RoleOption title="Administrador" value="administrador" color="red" />

        <Text className="text-xs text-gray-400 mt-4 text-center">
          ID do Usuário: {user._id}
        </Text>
      </ScrollView>

      {/* BOTÃO SALVAR */}
      <View className="p-5 border-t border-gray-100">
        <TouchableOpacity
          onPress={handleUpdate}
          disabled={loading}
          className={`w-full py-4 rounded-xl items-center ${
            loading ? "bg-blue-300" : "bg-blue-600"
          }`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">
              Salvar Alterações
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
