import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  // Mock dos posts DO USUÁRIO (Mesma estrutura do Feed)
  const myPosts = [
    {
      _id: "1",
      title: "Meu primeiro post no App",
      content:
        "Estou testando a funcionalidade de perfil. Ficou bem parecido com o Lingroom web!",
      date: "Hoje",
      imageUrl:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80",
      likes: 5,
      comments: 0,
    },
    {
      _id: "2",
      title: "Estudando React Native",
      content:
        "A curva de aprendizado é interessante, mas o NativeWind ajuda muito.",
      date: "Ontem",
      imageUrl: null, // Teste sem imagem
      likes: 12,
      comments: 3,
    },
  ];

  // --- FUNÇÕES DOS BOTÕES ---
  const handleEditProfile = () => {
    Alert.alert(
      "Editar Perfil",
      "Aqui abrirá a tela para alterar nome, foto e bio."
    );
  };

  const handleShareProfile = async () => {
    try {
      await Share.share({
        message: `Confira o perfil de ${user?.name} no LingroomTC!`,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível compartilhar.");
    }
  };

  // --- COMPONENTE DO CABEÇALHO (Bio, Stats) ---
  const renderHeader = () => (
    <View className="bg-white px-4 pt-4 pb-6 mb-2 border-b border-gray-200">
      <View className="flex-row items-center">
        <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center border-2 border-blue-50">
          <Text className="text-3xl text-blue-600 font-bold">
            {user?.name?.[0]}
          </Text>
        </View>
        <View className="ml-4 flex-1">
          <Text className="text-xl font-bold text-gray-900">{user?.name}</Text>
          <Text className="text-blue-600 text-sm font-medium uppercase">
            {user?.role || "Aluno"}
          </Text>
          <Text className="text-gray-500 text-xs mt-1">membro desde 2025</Text>
        </View>
      </View>

      {/* Botões de Ação Funcionais */}
      <View className="flex-row mt-6 space-x-3">
        <TouchableOpacity
          onPress={handleEditProfile}
          className="flex-1 bg-blue-600 py-2.5 rounded-lg items-center shadow-sm active:bg-blue-700"
        >
          <Text className="font-bold text-white">Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleShareProfile}
          className="flex-1 bg-white border border-gray-300 py-2.5 rounded-lg items-center active:bg-gray-50"
        >
          <Text className="font-bold text-gray-700">Compartilhar</Text>
        </TouchableOpacity>
      </View>

      {/* Estatísticas Simples */}
      <View className="flex-row justify-between mt-6 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
        <View className="items-center">
          <Text className="font-bold text-lg text-gray-900">
            {myPosts.length}
          </Text>
          <Text className="text-gray-500 text-xs uppercase">Publicações</Text>
        </View>
        <View className="w-[1px] bg-gray-200" />
        <View className="items-center">
          <Text className="font-bold text-lg text-gray-900">128</Text>
          <Text className="text-gray-500 text-xs uppercase">Conexões</Text>
        </View>
        <View className="w-[1px] bg-gray-200" />
        <View className="items-center">
          <Text className="font-bold text-lg text-gray-900">4.5</Text>
          <Text className="text-gray-500 text-xs uppercase">Avaliação</Text>
        </View>
      </View>
    </View>
  );

  // --- RENDERIZAÇÃO DO POST (CARD IGUAL AO FEED) ---
  const renderPostItem = ({ item }: { item: any }) => (
    <View className="bg-white mb-4 mx-4 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {item.imageUrl && (
        <Image
          source={{ uri: item.imageUrl }}
          className="w-full h-40 bg-gray-100"
          resizeMode="cover"
        />
      )}
      <View className="p-4">
        <Text className="text-base font-bold text-gray-900 mb-1">
          {item.title}
        </Text>
        <Text className="text-xs text-gray-400 mb-2">{item.date}</Text>
        <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>
          {item.content}
        </Text>

        <View className="flex-row justify-end space-x-4 border-t border-gray-100 pt-2">
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="create-outline" size={18} color="#3B82F6" />
            <Text className="text-blue-600 text-xs ml-1 font-bold">Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="trash-outline" size={18} color="#EF4444" />
            <Text className="text-red-500 text-xs ml-1 font-bold">Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <FlatList
        data={myPosts}
        keyExtractor={(item) => item._id}
        renderItem={renderPostItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   ScrollView,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { useAuth } from "../../context/AuthContext";

// export default function Profile() {
//   const { user, signOut } = useAuth();
//   // Mock de posts do usuário (depois vira API)
//   const userPosts = [
//     {
//       id: "1",
//       img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80",
//     },
//     {
//       id: "2",
//       img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
//     },
//     { id: "3", img: "https://via.placeholder.com/150" },
//   ];

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <ScrollView>
//         {/* --- CABEÇALHO DO PERFIL --- */}
//         <View className="px-4 pt-4 pb-6 border-b border-gray-200">
//           <View className="flex-row items-center justify-between mb-4">
//             <Text className="text-xl font-bold text-gray-900">
//               {user?.name || "Usuário"}
//             </Text>
//             <View className="flex-row space-x-4">
//               <TouchableOpacity>
//                 <Ionicons name="add-circle-outline" size={28} color="black" />
//               </TouchableOpacity>
//               <TouchableOpacity>
//                 <Ionicons name="menu-outline" size={28} color="black" />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View className="flex-row items-center">
//             {/* Avatar Grande */}
//             <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center border border-gray-300">
//               <Text className="text-3xl text-blue-600 font-bold">
//                 {user?.name?.[0]}
//               </Text>
//             </View>

//             {/* Estatísticas */}
//             <View className="flex-1 flex-row justify-around ml-4">
//               <View className="items-center">
//                 <Text className="font-bold text-lg text-gray-900">15</Text>
//                 <Text className="text-gray-600 text-xs">Posts</Text>
//               </View>
//               <View className="items-center">
//                 <Text className="font-bold text-lg text-gray-900">1.2k</Text>
//                 <Text className="text-gray-600 text-xs">Seguidores</Text>
//               </View>
//               <View className="items-center">
//                 <Text className="font-bold text-lg text-gray-900">500</Text>
//                 <Text className="text-gray-600 text-xs">Seguindo</Text>
//               </View>
//             </View>
//           </View>

//           {/* Bio e Cargo */}
//           <View className="mt-3">
//             <Text className="font-bold text-gray-800 text-base">
//               {user?.role === "professor"
//                 ? "🎓 Professor Certificado"
//                 : "📚 Aluno LearniFy"}
//             </Text>
//             <Text className="text-gray-600 mt-1">
//               Apaixonado por tecnologia e desenvolvimento FullStack. #React
//               #NodeJS
//             </Text>
//           </View>

//           {/* Botões de Ação */}
//           <View className="flex-row mt-4 space-x-3">
//             <TouchableOpacity className="flex-1 bg-gray-100 py-2 rounded-lg items-center">
//               <Text className="font-semibold text-gray-900">Editar Perfil</Text>
//             </TouchableOpacity>
//             <TouchableOpacity className="flex-1 bg-gray-100 py-2 rounded-lg items-center">
//               <Text className="font-semibold text-gray-900">Compartilhar</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* --- GRID DE POSTS (Estilo Galeria) --- */}
//         <View className="flex-row flex-wrap">
//           {userPosts.map((post) => (
//             <TouchableOpacity
//               key={post.id}
//               className="w-1/3 aspect-square border border-white p-0.5"
//             >
//               <Image
//                 source={{ uri: post.img }}
//                 className="w-full h-full bg-gray-200"
//                 resizeMode="cover"
//               />
//             </TouchableOpacity>
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
