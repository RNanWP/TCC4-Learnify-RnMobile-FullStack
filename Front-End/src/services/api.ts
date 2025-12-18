import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://192.168.100.86:3000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync("user_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.log("Erro ao pegar token:", error);
  }
  return config;
});

export default api;
