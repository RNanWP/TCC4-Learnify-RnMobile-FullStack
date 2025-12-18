import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AdminDashboard() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="flex-row items-center mb-8">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">
          Painel Administrativo
        </Text>
      </View>

      <Text className="text-gray-500 mb-6">
        O que você deseja gerenciar hoje?
      </Text>

      <View className="space-y-4">
        {/* Botão Posts */}
        <TouchableOpacity
          onPress={() => navigation.navigate("AdminPosts")}
          className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex-row items-center"
        >
          <View className="bg-blue-100 p-3 rounded-full mr-4">
            <Ionicons name="document-text" size={32} color="#2563EB" />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-blue-900">Postagens</Text>
            <Text className="text-blue-600 text-sm">
              Visualizar, editar e excluir posts
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#2563EB" />
        </TouchableOpacity>

        {/* Botão Usuários */}
        <TouchableOpacity
          onPress={() => navigation.navigate("AdminUsers")}
          className="bg-purple-50 p-6 rounded-xl border border-purple-100 flex-row items-center mt-4"
        >
          <View className="bg-purple-100 p-3 rounded-full mr-4">
            <Ionicons name="people" size={32} color="#7C3AED" />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-purple-900">Usuários</Text>
            <Text className="text-purple-600 text-sm">
              Gerenciar alunos e professores
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#7C3AED" />
        </TouchableOpacity>

        {/* Botão Comentários */}
        <TouchableOpacity
          onPress={() => navigation.navigate("AdminComments")}
          className="bg-orange-50 p-6 rounded-xl border border-orange-100 flex-row items-center mt-4"
        >
          <View className="bg-orange-100 p-3 rounded-full mr-4">
            <Ionicons name="chatbubbles" size={32} color="#EA580C" />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-orange-900">
              Comentários
            </Text>
            <Text className="text-orange-600 text-sm">
              Moderar discussões da comunidade
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#EA580C" />
        </TouchableOpacity>

        {/* Botão Relatórios */}
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Em Breve",
              "A funcionalidade de relatórios e métricas será implementada futuramente."
            )
          }
          className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex-row items-center mt-4"
        >
          <View className="bg-gray-200 p-3 rounded-full mr-4">
            <Ionicons name="bar-chart" size={32} color="#4B5563" />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-900">Relatórios</Text>
            <Text className="text-gray-600 text-sm">
              Métricas e estatísticas de uso
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
