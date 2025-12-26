import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function AdminUsers() {
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
    } catch (e) {
      Alert.alert("Erro", "Falha ao buscar usuários.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    Alert.alert("Excluir Usuário", "Tem certeza?", [
      { text: "Cancelar" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/users/${id}`);
            setUsers((prev) => prev.filter((u) => u._id !== id));
            Alert.alert("Sucesso", "Usuário excluído.");
          } catch (e) {
            Alert.alert("Erro", "Falha ao excluir.");
          }
        },
      },
    ]);
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleStyle = (role: string) => {
    switch (role) {
      case "administrador":
        return { bg: "bg-red-100", text: "text-red-700" };
      case "professor":
        return { bg: "bg-purple-100", text: "text-purple-700" };
      default:
        return { bg: "bg-green-100", text: "text-green-700" };
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">
          Gerenciar Usuários
        </Text>
      </View>

      <View className="bg-gray-100 rounded-xl px-4 py-3 mb-4 flex-row items-center">
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          className="flex-1 ml-2 text-base"
          placeholder="Buscar usuário..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#7C3AED" />
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const roleStyle = getRoleStyle(item.role);
            return (
              <View className="bg-white border border-gray-200 rounded-xl p-4 mb-3 shadow-sm flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-bold text-gray-900 text-lg">
                    {item.name}
                  </Text>
                  <Text className="text-gray-500 text-sm mb-2">
                    {item.email}
                  </Text>
                  <View
                    className={`self-start px-2 py-1 rounded-md ${roleStyle.bg}`}
                  >
                    <Text
                      className={`text-xs font-bold uppercase ${roleStyle.text}`}
                    >
                      {item.role}
                    </Text>
                  </View>
                </View>

                {item._id !== currentUser?._id && (
                  <View className="flex-row space-x-2">
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("EditUser", { user: item })
                      }
                      className="bg-blue-100 w-10 h-10 rounded-lg justify-center items-center mr-2"
                    >
                      <Ionicons
                        name="create-outline"
                        size={20}
                        color="#2563EB"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(item._id)}
                      className="bg-red-50 p-2 rounded-lg"
                    >
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color="#DC2626"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }}
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
