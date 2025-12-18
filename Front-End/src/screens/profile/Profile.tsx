import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import api from "../../services/api";

export default function Profile() {
  const { user, signOut, updateUser } = useAuth();
  const navigation = useNavigation<any>();
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchUserPosts();
    }, [])
  );

  async function fetchUserPosts() {
    try {
      const response = await api.get("/posts");
      const myPosts =
        user?.role === "administrador"
          ? response.data
          : response.data.filter(
              (p: any) => p.author?._id === user?._id || p.author === user?._id
            );
      setUserPosts(myPosts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleChangeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      const formData = new FormData();
      const filename = `upload.jpeg`;

      // @ts-ignore
      formData.append("avatar", {
        uri: selectedImage,
        name: filename,
        type: "image/jpeg",
      });

      try {
        const response = await api.patch("/users/avatar", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.data.user) {
          await updateUser(response.data.user);
          Alert.alert("Sucesso", "Foto atualizada!");
        }
      } catch (error) {
        Alert.alert("Erro", "Falha ao enviar foto. Tente novamente.");
      }
    }
  };

  const renderGridItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("PostDetails", { postId: item._id })}
      className="flex-1 m-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm h-64"
      style={{ maxWidth: "48%" }}
    >
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          className="w-full h-32 bg-gray-200"
          resizeMode="cover"
        />
      ) : (
        <View className="w-full h-32 bg-gray-100 items-center justify-center">
          <Ionicons name="image-outline" size={30} color="#CCC" />
        </View>
      )}
      <View className="p-3 justify-between flex-1">
        <View>
          <Text
            className="font-bold text-gray-900 text-sm leading-5 mb-1"
            numberOfLines={3}
          >
            {item.title}
          </Text>
          <Text className="text-[10px] text-gray-400">
            {item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : ""}
          </Text>
        </View>
        <View className="flex-row items-center mt-2">
          <Ionicons name="heart" size={14} color="#EF4444" />
          <Text className="text-xs text-gray-500 ml-1 font-bold">
            {item.likes?.length || 0}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const canAccessPanel =
    user?.role === "administrador" || user?.role === "professor";

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item._id}
        renderItem={renderGridItem}
        numColumns={2}
        columnWrapperStyle={{ paddingHorizontal: 12 }}
        ListHeaderComponent={
          <View className="px-4 py-6 border-b border-gray-100 mb-2">
            <View className="flex-row items-center mb-6">
              <TouchableOpacity
                onPress={handleChangeAvatar}
                className="relative"
              >
                <View className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-sm items-center justify-center">
                  {user?.avatarUrl ? (
                    <Image
                      source={{ uri: `${user.avatarUrl}?t=${Date.now()}` }}
                      className="w-full h-full"
                    />
                  ) : (
                    <Text className="text-4xl text-gray-400 font-bold">
                      {user?.name?.[0]}
                    </Text>
                  )}
                </View>
                <View className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full border-2 border-white">
                  <Ionicons name="camera" size={14} color="white" />
                </View>
              </TouchableOpacity>
              <View className="ml-5 flex-1">
                <Text className="text-2xl font-bold text-gray-900">
                  {user?.name}
                </Text>
                <Text className="text-blue-600 text-xs uppercase font-bold tracking-widest">
                  {user?.role || "Aluno"}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => navigation.navigate("EditProfile", { user })}
                className="bg-white border border-gray-300 py-2 px-10 rounded-lg mr-3"
              >
                <Text className="font-bold text-gray-700 text-sm">
                  Editar Perfil
                </Text>
              </TouchableOpacity>

              {/* Painel Admin */}
              {canAccessPanel && (
                <TouchableOpacity
                  onPress={() => navigation.navigate("AdminDashboard")}
                  className="bg-blue-50 py-2 px-5 rounded-lg border border-blue-100 mr-4 flex-row items-center"
                >
                  <Ionicons
                    name="settings-outline"
                    size={18}
                    color="#3B82F6"
                    style={{ marginRight: 4 }}
                  />
                  <Text className="font-bold text-blue-600 text-sm">
                    Painel
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={signOut}
                className="bg-red-50 p-2 rounded-lg ml-auto"
              >
                <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-10">
            Você ainda não tem publicações.
          </Text>
        }
      />
    </SafeAreaView>
  );
}
