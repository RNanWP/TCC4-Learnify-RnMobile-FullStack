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

  // Selecionar Imagem
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Enviar Post
  async function handlePublish() {
    if (!title || !content)
      return Alert.alert("Ops", "Preencha título e conteúdo!");

    setUploading(true);
    try {
      // Form Data para envio de arquivo
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      if (image) {
        // Gambiarra necessária para o React Native entender o arquivo
        const filename = image.split("/").pop();
        const match = /\.(\w+)$/.exec(filename || "");
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("image", { uri: image, name: filename, type } as any);
      }

      // IMPORTANTE: O Header 'Content-Type': 'multipart/form-data' é automático no Axios quando envia FormData
      await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Sucesso", "Post publicado!");
      setTitle("");
      setContent("");
      setImage(null);
      navigation.navigate("Feed"); // Volta e atualiza
    } catch (error) {
      Alert.alert("Erro", "Falha ao publicar post.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-gray-500 text-lg">Cancelar</Text>
        </TouchableOpacity>
        <Text className="font-bold text-lg text-gray-900">Novo Post</Text>
        <TouchableOpacity
          onPress={handlePublish}
          disabled={uploading}
          className={`px-4 py-2 rounded-full ${
            uploading ? "bg-gray-400" : "bg-blue-600"
          }`}
        >
          {uploading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text className="text-white font-bold">Publicar</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView className="p-5">
        {/* Seção 1: Título */}
        <View className="mb-6">
          <Text className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">
            Título do Post
          </Text>
          <TextInput
            className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2"
            placeholder="Ex: Aprendendo Hooks no React..."
            placeholderTextColor="#9CA3AF"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Seção 2: Conteúdo */}
        <View className="mb-6">
          <Text className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">
            Conteúdo
          </Text>
          <TextInput
            className="text-base text-gray-700 min-h-[120px] bg-gray-50 p-3 rounded-xl text-top"
            placeholder="Compartilhe seu conhecimento aqui..."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
            value={content}
            onChangeText={setContent}
          />
        </View>

        {/* Seção 3: Imagem (Botão Grande e Visível) */}
        <TouchableOpacity
          onPress={pickImage}
          className="border-2 border-dashed border-gray-300 rounded-xl h-48 items-center justify-center bg-gray-50 active:bg-gray-100"
        >
          {image ? (
            <Image
              source={{ uri: image }}
              className="w-full h-full rounded-xl"
              resizeMode="cover"
            />
          ) : (
            <>
              <Ionicons name="image-outline" size={40} color="#9CA3AF" />
              <Text className="text-gray-400 mt-2 font-medium">
                Toque para adicionar capa
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
