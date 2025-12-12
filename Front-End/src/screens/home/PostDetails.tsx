import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function PostDetails() {
  const route = useRoute();
  const { user } = useAuth();
  const { postId } = route.params as { postId: string };

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const [postRes, commentRes] = await Promise.all([
        api.get(`/posts/${postId}`),
        api.get(`/posts/${postId}/comments`),
      ]);
      setPost(postRes.data);
      setComments(commentRes.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSendComment() {
    if (!newComment.trim()) return;
    try {
      await api.post(`/posts/${postId}/comments`, { content: newComment });
      setNewComment("");
      loadData();
    } catch (error) {
      Alert.alert("Erro", "Falha ao comentar.");
    }
  }

  if (loading || !post)
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text>Carregando...</Text>
      </View>
    );

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* POST PRINCIPAL */}
        <View className="p-4 border-b border-gray-100">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Text className="text-blue-600 font-bold">
                {post.author?.name?.[0]}
              </Text>
            </View>
            <View>
              <Text className="font-bold text-gray-900">
                {post.author?.name}
              </Text>
              <Text className="text-xs text-gray-500">Autor</Text>
            </View>
          </View>

          <Text className="text-xl font-bold text-gray-900 mb-2">
            {post.title}
          </Text>
          <Text className="text-gray-700 leading-6 mb-4">{post.content}</Text>

          {post.imageUrl && (
            <Image
              source={{ uri: post.imageUrl }}
              className="w-full h-64 rounded-xl bg-gray-100 mb-4"
              resizeMode="cover"
            />
          )}
        </View>

        {/* LISTA DE COMENTÁRIOS */}
        <View className="p-4">
          <Text className="font-bold text-gray-800 mb-4 text-lg">
            Comentários ({comments.length})
          </Text>
          {comments.map((comment) => (
            <View
              key={comment._id}
              className="flex-row mb-4 bg-gray-50 p-3 rounded-lg"
            >
              <View className="w-8 h-8 bg-gray-300 rounded-full items-center justify-center mr-3">
                <Text className="font-bold text-gray-600">
                  {comment.author?.name?.[0] || "?"}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="font-bold text-xs text-gray-500 mb-1">
                  {comment.author?.name}
                </Text>
                <Text className="text-gray-800 text-sm">{comment.content}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* INPUT DE COMENTÁRIO FIXO EMBAIXO */}
      <View className="p-3 border-t border-gray-200 bg-white flex-row items-center">
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-3 mr-2"
          placeholder="Escreva um comentário..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity
          onPress={handleSendComment}
          className="bg-blue-600 p-3 rounded-full"
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
