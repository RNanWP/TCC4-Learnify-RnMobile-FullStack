import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import api from "../../services/api";

export default function CreatePost({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setImage(null);
    navigation.goBack();
  };

  async function handlePublish() {
    if (!title.trim() || !content.trim()) {
      return Alert.alert("Atenção", "Preencha título e conteúdo.");
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      if (image) {
        const filename = image.split("/").pop() || "upload.jpg";
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image/jpeg`;

        // @ts-ignore
        formData.append("image", {
          uri: image,
          name: filename,
          type,
        });
      }

      await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Sucesso", "Post publicado!");
      setTitle("");
      setContent("");
      setImage(null);
      navigation.navigate("Feed");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível publicar. Tente novamente.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="bg-white px-4 py-3 border-b border-gray-200 flex-row justify-between items-center shadow-sm">
        <TouchableOpacity onPress={handleCancel}>
          <Text className="text-gray-500 text-lg">Cancelar</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">
          Criar Publicação
        </Text>
        <TouchableOpacity
          onPress={handlePublish}
          disabled={uploading}
          className={`px-4 py-2 rounded-full ${
            uploading ? "bg-gray-300" : "bg-blue-600"
          }`}
        >
          {uploading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text className="text-white font-bold">Publicar</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="bg-white p-4 rounded-xl shadow-sm mb-4 border border-gray-200">
          <Text className="text-xs font-bold text-gray-400 uppercase mb-3">
            Capa da Publicação
          </Text>
          <TouchableOpacity
            onPress={pickImage}
            className="w-full h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 items-center justify-center overflow-hidden"
          >
            {image ? (
              <Image
                source={{ uri: image }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <View className="items-center">
                <Ionicons name="image-outline" size={40} color="#9CA3AF" />
                <Text className="text-gray-400 font-medium mt-2">
                  Toque para adicionar imagem
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="bg-white p-4 rounded-xl shadow-sm mb-4 border border-gray-200">
          <Text className="text-xs font-bold text-gray-400 uppercase mb-2">
            Título
          </Text>
          <TextInput
            className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2"
            placeholder="Título do post..."
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View className="bg-white p-4 rounded-xl shadow-sm mb-8 border border-gray-200 min-h-[200px]">
          <Text className="text-xs font-bold text-gray-400 uppercase mb-2">
            Conteúdo
          </Text>
          <TextInput
            className="text-base text-gray-700 leading-6"
            placeholder="Escreva seu conteúdo aqui..."
            multiline
            textAlignVertical="top"
            value={content}
            onChangeText={setContent}
            style={{ minHeight: 150 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
