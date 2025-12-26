import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function UserList() {
  const navigation = useNavigation<any>();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os usuários.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    Alert.alert(
      "Excluir Usuário",
      "Tem certeza? Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/users/${id}`);
              setUsers((prev) => prev.filter((u) => u._id !== id));
              Alert.alert("Sucesso", "Usuário removido.");
            } catch (error) {
              Alert.alert("Erro", "Falha ao excluir usuário.");
            }
          },
        },
      ]
    );
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case "administrador":
        return "text-red-600 bg-red-100";
      case "professor":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-green-600 bg-green-100";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">
          Gerenciar Usuários
        </Text>
      </View>

      <View className="bg-gray-100 rounded-xl px-4 py-3 mb-4 flex-row items-center">
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          className="flex-1 ml-2 text-base"
          placeholder="Buscar por nome ou email..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* LISTA */}
      {loading ? (
        <ActivityIndicator size="large" color="#3B82F6" />
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center bg-gray-50 p-4 mb-3 rounded-xl border border-gray-100">
              <View className="flex-1 mr-2">
                <Text className="font-bold text-gray-900 text-lg">
                  {item.name}
                </Text>
                <Text className="text-gray-500 text-sm mb-1">{item.email}</Text>

                <View
                  className={`self-start px-2 py-0.5 rounded ${
                    getRoleColor(item.role).split(" ")[1]
                  }`}
                >
                  <Text
                    className={`text-xs font-bold uppercase ${
                      getRoleColor(item.role).split(" ")[0]
                    }`}
                  >
                    {item.role}
                  </Text>
                </View>
              </View>

              {item._id !== currentUser?._id && (
                <View className="flex-row">
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("EditUser", { user: item })
                    }
                    className="bg-blue-100 p-2 rounded-lg mr-2"
                  >
                    <Ionicons name="create-outline" size={20} color="#2563EB" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDelete(item._id)}
                    className="bg-red-100 p-2 rounded-lg"
                  >
                    <Ionicons name="trash-outline" size={20} color="#DC2626" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-center text-gray-400 mt-10">
              Nenhum usuário encontrado.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
