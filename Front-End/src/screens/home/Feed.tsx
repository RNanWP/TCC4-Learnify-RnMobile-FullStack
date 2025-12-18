import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const HIGHLIGHTS = [
  {
    id: "1",
    title: "IA Generativa",
    color: "bg-purple-100",
    icon: "hardware-chip",
    iconColor: "#8B5CF6",
  },
  {
    id: "2",
    title: "Tech News",
    color: "bg-blue-100",
    icon: "newspaper",
    iconColor: "#3B82F6",
  },
  {
    id: "3",
    title: "Vagas TI",
    color: "bg-green-100",
    icon: "briefcase",
    iconColor: "#10B981",
  },
  {
    id: "4",
    title: "Comunidade",
    color: "bg-orange-100",
    icon: "people",
    iconColor: "#F97316",
  },
  {
    id: "5",
    title: "Eventos",
    color: "bg-orange-100",
    icon: "calendar",
    iconColor: "#F97316",
  },
];

export default function Feed() {
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  async function fetchPosts() {
    setLoading(true);
    try {
      let response;
      if (searchText.trim()) {
        response = await api.get(`/posts/search?q=${searchText}`);
      } else {
        response = await api.get("/posts");
      }
      setPosts(response.data);
    } catch (error) {
      console.log("Erro ao buscar posts", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLike(postId: string) {
    const originalPosts = [...posts];
    setPosts((current) =>
      current.map((p) => {
        if (p._id === postId) {
          const likes = p.likes || [];
          const isLiked = likes.includes(user?._id);
          return {
            ...p,
            likes: isLiked
              ? likes.filter((id: string) => id !== user?._id)
              : [...likes, user?._id],
          };
        }
        return p;
      })
    );

    try {
      await api.patch(`/posts/${postId}/like`);
    } catch (error) {
      setPosts(originalPosts);
    }
  }

  const renderHeader = () => (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 8,
        }}
      >
        {HIGHLIGHTS.map((item) => (
          <TouchableOpacity
            key={item.id}
            className={`mr-4 ${item.color} w-28 h-28 rounded-2xl items-center justify-center border border-gray-50 shadow-sm`}
          >
            <View className="bg-white/50 p-3 rounded-full mb-2">
              <Ionicons
                name={item.icon as any}
                size={28}
                color={item.iconColor}
              />
            </View>
            <Text className="text-xs font-bold text-gray-700 text-center px-1">
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text className="px-4 mt-4 mb-2 text-lg font-bold text-gray-800">
        Feed Principal
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: any }) => {
    const likes = item.likes || [];
    const isLiked = likes.includes(user?._id);
    const dateFormatted = item.createdAt
      ? new Date(item.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        })
      : "";

    return (
      <View className="bg-white mb-4 mx-4 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <View className="px-4 py-3 flex-row items-center justify-between border-b border-gray-50">
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center mr-2 overflow-hidden border border-gray-200">
              {item.author?.avatarUrl ? (
                <Image
                  source={{ uri: item.author.avatarUrl }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <Text className="text-blue-600 font-bold text-xs">
                  {item.author?.name?.[0] || "?"}
                </Text>
              )}
            </View>
            <Text className="font-bold text-gray-800 text-sm">
              {item.author?.name || "Usuário"}
            </Text>
          </View>
          <Text className="text-xs text-gray-400">{dateFormatted}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate("PostDetails", { postId: item._id })
          }
        >
          {item.imageUrl && (
            <Image
              source={{ uri: item.imageUrl }}
              className="w-full h-64 bg-gray-100"
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>

        <View className="p-4">
          <Text className="text-lg font-bold text-gray-900 mb-1 leading-6">
            {item.title}
          </Text>
          <Text
            className="text-gray-600 text-sm mb-3 leading-5"
            numberOfLines={3}
          >
            {item.content}
          </Text>

          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => handleLike(item._id)}
              className="flex-row items-center py-1 pr-3"
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={24}
                color={isLiked ? "#EF4444" : "#4B5563"}
              />
              <Text
                className={`ml-1.5 font-bold ${
                  isLiked ? "text-red-500" : "text-gray-500"
                }`}
              >
                {likes.length}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      {/* HEADER*/}
      <View className="bg-white px-4 py-3 border-b border-gray-200 flex-row items-center">
        <Text className="text-xl font-bold text-blue-600 mr-4">LearniFy</Text>
        <View className="flex-1 flex-row bg-gray-100 rounded-lg px-3 py-2 items-center">
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 text-gray-800 py-0"
            placeholder="Pesquisar..."
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            onSubmitEditing={fetchPosts}
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchText("");
                fetchPosts();
              }}
            >
              <Ionicons name="close-circle" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <ActivityIndicator className="mt-10" size="large" color="#3B82F6" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}
