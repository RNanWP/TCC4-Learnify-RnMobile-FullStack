import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function PostDetails() {
  const route = useRoute();
  const navigation = useNavigation();
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
      Alert.alert("Erro", "Falha ao carregar.");
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

  async function handleDeleteComment(commentId: string) {
    Alert.alert("Excluir", "Deseja apagar este comentário?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sim",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/comments/${commentId}`);
            setComments((current) =>
              current.filter((c) => c._id !== commentId)
            );
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir.");
          }
        },
      },
    ]);
  }

  if (loading || !post)
    return <ActivityIndicator className="flex-1" color="#3B82F6" />;

  const dateFormatted = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const authorName = post.author?.name || "Autor Desconhecido";
  const authorInitial = authorName[0]?.toUpperCase() || "?";
  const authorAvatar = post.author?.avatarUrl;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <StatusBar barStyle="dark-content" />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 40,
          left: 16,
          zIndex: 10,
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: 8,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* HERO */}
        {post.imageUrl ? (
          <Image
            source={{ uri: post.imageUrl }}
            className="w-full h-72 bg-gray-200"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-24 bg-white" />
        )}

        {/* INFORMAÇÕES DO AUTOR */}
        <View className="px-3 py-2 flex-row items-center border-b border-gray-100">
          <View className="w-9 h-9 rounded-full bg-gray-100 mr-3 overflow-hidden border border-gray-200 items-center justify-center">
            {authorAvatar ? (
              <Image
                source={{ uri: authorAvatar }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-blue-600 font-bold text-sm">
                {authorInitial}
              </Text>
            )}
          </View>
          <View>
            <Text className="font-bold text-gray-900 text-sm">
              {authorName}
            </Text>
            <Text className="text-xs text-gray-500">{dateFormatted}</Text>
          </View>
        </View>

        {/* TÍTULO E CONTEÚDO */}
        <View className="px-5 pt-4 pb-8">
          <Text className="text-2xl font-extrabold text-gray-900 mb-4 leading-8">
            {post.title}
          </Text>
          <Text className="text-gray-700 text-base leading-7">
            {post.content}
          </Text>
        </View>

        <View className="bg-gray-50 p-5 border-t border-gray-100 min-h-[300px]">
          <Text className="font-bold text-gray-800 mb-4 text-base uppercase tracking-wider">
            Comentários ({comments.length})
          </Text>

          {comments.map((comment) => (
            <View
              key={comment._id}
              className="flex-row mb-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 items-start"
            >
              <View className="w-8 h-8 bg-blue-50 rounded-full items-center justify-center mr-3 border border-blue-100">
                <Text className="font-bold text-blue-600 text-xs">
                  {comment.author?.name?.[0] || "?"}
                </Text>
              </View>

              <View className="flex-1">
                <Text className="font-bold text-xs text-gray-900 mb-1">
                  {comment.author?.name || "Anônimo"}
                </Text>
                <Text className="text-gray-700 text-sm leading-5">
                  {comment.content}
                </Text>
              </View>

              {(user?.role === "administrador" ||
                user?._id === comment.author?._id) && (
                <TouchableOpacity
                  onPress={() => handleDeleteComment(comment._id)}
                  className="p-1 ml-2"
                >
                  <Ionicons name="trash-outline" size={18} color="#EF4444" />
                </TouchableOpacity>
              )}
            </View>
          ))}

          {comments.length === 0 && (
            <Text className="text-gray-400 text-center italic py-6">
              Nenhum comentário ainda. Seja o primeiro!
            </Text>
          )}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 flex-row items-center">
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-5 py-3 mr-3 text-base"
          placeholder="Escreva um comentário..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity
          onPress={handleSendComment}
          className="bg-blue-600 p-3 rounded-full shadow-sm"
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
