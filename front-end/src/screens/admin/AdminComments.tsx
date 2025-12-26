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

export default function AdminComments() {
  const navigation = useNavigation<any>();
  const { user: currentUser } = useAuth();
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    try {
      const response = await api.get("/comments");
      setComments(response.data);
    } catch (error) {
      Alert.alert("Erro", "Falha ao carregar comentários.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    Alert.alert(
      "Excluir Comentário",
      "Tem certeza que deseja remover este comentário permanentemente?",
      [
        { text: "Cancelar" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/comments/${id}`);
              setComments((prev) => prev.filter((c) => c._id !== id));
              Alert.alert("Sucesso", "Comentário removido.");
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir.");
            }
          },
        },
      ]
    );
  }

  const filteredComments = comments.filter(
    (c) =>
      c.content.toLowerCase().includes(search.toLowerCase()) ||
      c.author?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">
          Gerenciar Comentários
        </Text>
      </View>

      <View className="bg-gray-100 rounded-xl px-4 py-3 mb-4 flex-row items-center">
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          className="flex-1 ml-2 text-base"
          placeholder="Buscar comentário ou autor..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* LISTA */}
      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" />
      ) : (
        <FlatList
          data={filteredComments}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View className="bg-white border border-gray-200 rounded-xl p-4 mb-3 shadow-sm flex-row justify-between items-center">
              <View className="flex-1 mr-2">
                <Text
                  numberOfLines={2}
                  className="font-bold text-gray-900 text-base mb-1"
                >
                  "{item.content}"
                </Text>
                <Text className="text-xs text-gray-500">
                  Por: {item.author?.name || "Anônimo"}
                </Text>
              </View>

              <View className="flex-row items-center">
                {/* <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("EditComment", { comment: item })
                  }
                  className="bg-blue-100 w-10 h-10 rounded-lg justify-center items-center mr-2"
                >
                  <Ionicons name="create-outline" size={20} color="#2563EB" />
                </TouchableOpacity> */}

                {/* Botão Excluir */}
                <TouchableOpacity
                  onPress={() => handleDelete(item._id)}
                  className="bg-red-100 w-10 h-10 rounded-lg justify-center items-center"
                >
                  <Ionicons name="trash-outline" size={20} color="#DC2626" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-center text-gray-400 mt-10">
              Nenhum comentário encontrado.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
