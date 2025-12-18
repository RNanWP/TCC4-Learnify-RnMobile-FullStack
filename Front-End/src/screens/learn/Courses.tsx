import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const TRILHAS = [
  {
    id: "1",
    name: "Front-end",
    color: "bg-blue-100",
    iconColor: "#3B82F6",
    icon: "logo-react",
  },
  {
    id: "2",
    name: "Back-end",
    color: "bg-green-100",
    iconColor: "#10B981",
    icon: "server-outline",
  },
  {
    id: "3",
    name: "Mobile",
    color: "bg-purple-100",
    iconColor: "#8B5CF6",
    icon: "phone-portrait-outline",
  },
  {
    id: "4",
    name: "DevOps",
    color: "bg-orange-100",
    iconColor: "#F97316",
    icon: "cloud-outline",
  },
];

const ALL_COURSES = [
  {
    id: "1",
    title: "Formação React Native",
    school: "Mobile",
    progress: 45,
    image:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=400&q=80",
  },
  {
    id: "2",
    title: "Node.js do Zero ao Pro",
    school: "Back-end",
    progress: 10,
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&q=80",
  },
  {
    id: "3",
    title: "Arquitetura de Software",
    school: "Engenharia",
    progress: 0,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
  },
];

export default function Courses() {
  const [searchText, setSearchText] = useState("");

  const filteredCourses = ALL_COURSES.filter(
    (course) =>
      course.title.toLowerCase().includes(searchText.toLowerCase()) ||
      course.school.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderCourse = (item: any) => (
    <View
      key={item.id}
      className="bg-white mb-4 rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-row opacity-80"
    >
      <Image
        source={{ uri: item.image }}
        className="w-24 h-24 bg-gray-300"
        resizeMode="cover"
      />
      <View className="p-3 flex-1 justify-between">
        <View>
          <Text className="text-xs text-blue-600 font-bold uppercase mb-1">
            {item.school}
          </Text>
          <Text className="font-bold text-gray-800 text-base leading-5">
            {item.title}
          </Text>
        </View>
        <View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-xs text-gray-500">Progresso</Text>
            <Text className="text-xs text-gray-800 font-bold">
              {item.progress}%
            </Text>
          </View>
          <View className="w-full h-1.5 bg-gray-100 rounded-full">
            <View
              className="h-1.5 bg-green-500 rounded-full"
              style={{ width: `${item.progress}%` }}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View className="bg-yellow-100 p-3 border-b border-yellow-300 flex-row items-center justify-center z-50">
        <Ionicons
          name="construct"
          size={20}
          color="#854D0E"
          style={{ marginRight: 8 }}
        />
        <View>
          <Text className="font-bold text-yellow-900 text-sm">
            Em Desenvolvimento
          </Text>
          <Text className="text-yellow-800 text-xs">
            Esta área estará disponível em breve!
          </Text>
        </View>
      </View>

      {/* Header Busca */}
      {/* <View className="px-4 py-3 bg-white border-b border-gray-200">
        <View className="flex-row bg-gray-100 rounded-lg px-3 py-2 items-center">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 text-gray-800"
            placeholder="Buscar cursos..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View> */}

      <View className="flex-1">
        <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
          <View className="mb-6 opacity-60">
            <Text className="text-lg font-bold text-gray-800 mb-3">
              Continuar de onde parou
            </Text>
            <TouchableOpacity className="bg-blue-600 rounded-xl p-4 shadow-lg shadow-blue-200 flex-row items-center">
              <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-3">
                <Ionicons name="play" size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold text-lg">
                  React Native: Hooks
                </Text>
                <Text className="text-blue-100 text-sm">
                  Aula 4 de 12 • 15 min restantes
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Trilhas */}
          <View className="mb-6 opacity-60">
            <Text className="text-lg font-bold text-gray-800 mb-3">
              Trilhas
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
            >
              {TRILHAS.map((trilha) => (
                <View
                  key={trilha.id}
                  className={`mr-3 ${trilha.color} w-28 h-28 rounded-xl items-center justify-center border border-gray-100`}
                >
                  <Ionicons
                    name={trilha.icon as any}
                    size={32}
                    color={trilha.iconColor}
                  />
                  <Text className="font-bold text-gray-700 mt-2">
                    {trilha.name}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View className="opacity-60">
            <Text className="text-lg font-bold text-gray-800 mb-3">
              Catálogo
            </Text>
            {filteredCourses.map((course) => renderCourse(course))}
          </View>
          <View className="h-20" />
        </ScrollView>

        {/* OVERLAY */}
        <View
          className="absolute top-0 left-0 right-0 bottom-0 bg-black/35"
          pointerEvents="none"
        />
      </View>
    </SafeAreaView>
  );
}
