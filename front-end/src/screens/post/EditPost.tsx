import React, { useState, useEffect } from "react";
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
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";

export default function EditPost() {
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  const { post } = route.params;

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await api.put(`/posts/${post._id}`, { title, content });
      Alert.alert("Sucesso", "Post atualizado!");
      // @ts-ignore
      navigation.navigate("Feed");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar alterações.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="bg-white px-4 py-3 border-b border-gray-200 flex-row justify-between items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-gray-500 text-lg">Cancelar</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">Editar Post</Text>
        <TouchableOpacity onPress={handleSave} disabled={saving}>
          {saving ? (
            <ActivityIndicator color="#3B82F6" />
          ) : (
            <Text className="text-blue-600 font-bold text-lg">Salvar</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView className="p-4">
        <View className="bg-white p-4 rounded-xl shadow-sm mb-4">
          <Text className="text-xs font-bold text-gray-400 uppercase mb-2">
            Título
          </Text>
          <TextInput
            className="text-lg font-bold text-gray-900"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View className="bg-white p-4 rounded-xl shadow-sm mb-4 min-h-[200px]">
          <Text className="text-xs font-bold text-gray-400 uppercase mb-2">
            Conteúdo
          </Text>
          <TextInput
            className="text-base text-gray-700 leading-6"
            multiline
            textAlignVertical="top"
            value={content}
            onChangeText={setContent}
          />
        </View>

        <Text className="text-center text-gray-400 text-xs">
          A imagem não pode ser alterada na edição rápida.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
