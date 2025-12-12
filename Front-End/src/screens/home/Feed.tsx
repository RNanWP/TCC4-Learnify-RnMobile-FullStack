// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   RefreshControl,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { useAuth } from "../../context/AuthContext";
// import api from "../../services/api";

// // --- COMPONENTE SKELETON (Ajustado para o novo card) ---
// const PostSkeleton = () => (
//   <View className="bg-white mb-4 p-4 rounded-xl shadow-sm mx-4 border border-gray-100">
//     <View className="flex-row items-center mb-3">
//       <View className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
//       <View className="ml-3 space-y-2">
//         <View className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
//         <View className="w-20 h-3 bg-gray-200 rounded animate-pulse" />
//       </View>
//     </View>
//     <View className="w-full h-32 bg-gray-200 rounded-lg mb-3 animate-pulse" />
//     <View className="w-full h-4 bg-gray-200 rounded animate-pulse" />
//   </View>
// );

// export default function Feed() {
//   const { signOut, user } = useAuth();
//   const [posts, setPosts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   async function fetchPosts() {
//     try {
//       // Mock de dados estilo Lingroom (Título + Conteúdo + Imagem média)
//       setPosts([
//         {
//           _id: "1",
//           title: "Medalha de Ouro em Esportes Bizarros",
//           content:
//             "Grandes eventos como as Olimpíadas sempre nos apresentam esportes novos e, sejamos sinceros, alguns bem curiosos...",
//           author: { name: "Administrador Insomnia", role: "professor" },
//           date: "8 de out. de 2025",
//           imageUrl:
//             "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80",
//           likes: 15,
//           comments: 11,
//         },
//         {
//           _id: "2",
//           title: "Inteligência Artificial vai roubar seu emprego?",
//           content:
//             "Essa é a pergunta do século. A resposta curta é: não, mas quem souber usar IA vai.",
//           author: { name: "Renan Oliveira", role: "administrador" },
//           date: "8 de out. de 2025",
//           imageUrl:
//             "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&q=80",
//           likes: 42,
//           comments: 8,
//         },
//       ]);
//     } catch (error) {
//       console.log("Erro");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }

//   useEffect(() => {
//     setTimeout(() => fetchPosts(), 1000);
//   }, []);

//   const handleLogout = () => {
//     Alert.alert("Sair", "Deseja desconectar?", [
//       { text: "Cancelar", style: "cancel" },
//       { text: "Sair", style: "destructive", onPress: signOut },
//     ]);
//   };

//   // --- RENDERIZAÇÃO DO CARD ESTILO LINGROOM ---
//   const renderItem = ({ item }: { item: any }) => (
//     <View className="bg-white mb-4 mx-4 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//       {/* 1. Imagem de Capa (Menor, estilo blog) */}
//       {item.imageUrl && (
//         <Image
//           source={{ uri: item.imageUrl }}
//           className="w-full h-48 bg-gray-100"
//           resizeMode="cover"
//         />
//       )}

//       <View className="p-4">
//         {/* 2. Título Forte */}
//         <Text className="text-lg font-bold text-gray-900 leading-6 mb-2">
//           {item.title}
//         </Text>

//         {/* 3. Autor e Data (Pequeno) */}
//         <View className="flex-row items-center mb-3">
//           <Ionicons name="person-circle-outline" size={16} color="#6B7280" />
//           <Text className="text-xs text-gray-500 ml-1 mr-3">
//             {item.author.name}
//           </Text>

//           <Ionicons name="calendar-outline" size={14} color="#6B7280" />
//           <Text className="text-xs text-gray-500 ml-1">{item.date}</Text>
//         </View>

//         {/* 4. Resumo do Conteúdo */}
//         <Text
//           className="text-gray-600 text-sm leading-5 mb-4"
//           numberOfLines={3}
//         >
//           {item.content}
//         </Text>

//         {/* 5. Linha Divisória e Ações (Embaixo) */}
//         <View className="border-t border-gray-100 pt-3 flex-row justify-between items-center">
//           {/* Botão Curtir */}
//           <TouchableOpacity className="flex-row items-center space-x-1">
//             <Ionicons name="heart-outline" size={20} color="#4B5563" />
//             <Text className="text-gray-600 text-xs font-medium">
//               {item.likes}
//             </Text>
//           </TouchableOpacity>

//           {/* Botão Comentar */}
//           <TouchableOpacity className="flex-row items-center space-x-1">
//             <Ionicons name="chatbox-outline" size={20} color="#4B5563" />
//             <Text className="text-gray-600 text-xs font-medium">
//               {item.comments}
//             </Text>
//           </TouchableOpacity>

//           {/* Botão Editar (Apenas visual por enquanto) */}
//           <TouchableOpacity className="flex-row items-center space-x-1 bg-gray-50 px-3 py-1 rounded-md border border-gray-200">
//             <Ionicons name="create-outline" size={16} color="#374151" />
//             <Text className="text-gray-700 text-xs font-medium">Editar</Text>
//           </TouchableOpacity>

//           <TouchableOpacity>
//             <Ionicons name="trash-outline" size={20} color="#EF4444" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
//       {/* Header Fixo */}
//       <View className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-gray-200 mb-2">
//         <Text className="text-xl font-bold text-blue-600">
//           Lingroom<Text className="text-blue-800">TC</Text>
//         </Text>
//         <View className="flex-row items-center space-x-3">
//           <TouchableOpacity
//             onPress={() => {}}
//             className="bg-blue-50 p-2 rounded-full"
//           >
//             <Ionicons name="search" size={20} color="#3B82F6" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleLogout}>
//             <Ionicons name="log-out-outline" size={24} color="#EF4444" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {loading ? (
//         <View>
//           <PostSkeleton />
//           <PostSkeleton />
//         </View>
//       ) : (
//         <FlatList
//           data={posts}
//           keyExtractor={(item) => item._id}
//           renderItem={renderItem}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={() => {
//                 setRefreshing(true);
//                 fetchPosts();
//               }}
//             />
//           }
//           contentContainerStyle={{ paddingBottom: 20 }}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// --------------

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Navegação
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function Feed() {
  const { signOut, user } = useAuth();
  const navigation = useNavigation<any>();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  async function fetchPosts() {
    try {
      // Busca real do backend (query params se tiver busca)
      const url = searchText ? `/posts?search=${searchText}` : "/posts";
      const response = await api.get(url);
      setPosts(response.data);
    } catch (error) {
      console.log("Erro ao buscar posts", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  // --- AÇÕES REAIS ---
  async function handleLike(postId: string) {
    try {
      // Chama o endpoint de like (ajuste a rota se for diferente no backend)
      await api.patch(`/posts/${postId}/like`);
      fetchPosts(); // Atualiza para ver o numero mudar
    } catch (error) {
      console.log("Erro no like");
    }
  }

  async function handleDelete(postId: string) {
    Alert.alert("Excluir", "Tem certeza?", [
      { text: "Cancelar" },
      {
        text: "Sim",
        style: "destructive",
        onPress: async () => {
          await api.delete(`/posts/${postId}`);
          fetchPosts();
        },
      },
    ]);
  }

  // --- RENDERIZAÇÃO ---
  const renderItem = ({ item }: { item: any }) => {
    const isOwner = item.author?._id === user?._id; // Verifica se sou dono

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate("PostDetails", { postId: item._id })} // Clica no post -> Vai pra detalhes
        className="bg-white mb-4 mx-4 rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {item.imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            className="w-full h-48 bg-gray-100"
            resizeMode="cover"
          />
        )}

        <View className="p-4">
          <Text className="text-lg font-bold text-gray-900 mb-2">
            {item.title}
          </Text>

          <View className="flex-row items-center mb-3">
            <Text className="text-xs text-gray-500 font-bold mr-2">
              {item.author?.name}
            </Text>
            <Text className="text-xs text-gray-400">
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>

          <Text className="text-gray-600 text-sm mb-4" numberOfLines={3}>
            {item.content}
          </Text>

          {/* BARRA DE AÇÕES */}
          <View className="border-t border-gray-100 pt-3 flex-row justify-between items-center">
            {/* Like */}
            <TouchableOpacity
              onPress={() => handleLike(item._id)}
              className="flex-row items-center p-2"
            >
              <Ionicons name="heart-outline" size={22} color="#EF4444" />
              <Text className="ml-1 text-gray-600">
                {item.likes?.length || 0}
              </Text>
            </TouchableOpacity>

            {/* Comentários (Botão leva para detalhes) */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PostDetails", { postId: item._id })
              }
              className="flex-row items-center p-2"
            >
              <Ionicons name="chatbubble-outline" size={20} color="#3B82F6" />
              <Text className="ml-1 text-gray-600">Comentar</Text>
            </TouchableOpacity>

            {/* Ações do Dono */}
            {isOwner && (
              <View className="flex-row">
                <TouchableOpacity className="p-2 mr-2">
                  <Ionicons name="create-outline" size={20} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item._id)}
                  className="p-2"
                >
                  <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      {/* Header com Busca */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xl font-bold text-blue-600">LearniFy</Text>
          <TouchableOpacity onPress={signOut}>
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>

        {/* Campo de Busca Funcional */}
        <View className="flex-row bg-gray-100 rounded-lg px-3 py-2 items-center">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 text-gray-800"
            placeholder="Pesquisar posts..."
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={fetchPosts} // Busca ao dar Enter
          />
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchPosts();
            }}
          />
        }
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
      />
    </SafeAreaView>
  );
}
