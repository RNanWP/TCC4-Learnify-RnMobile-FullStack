import axios from "axios";
import { getStorageItem } from "../utils/storage";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://tcc4-learnify-rnmobile-fullstack.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 60000,
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await getStorageItem("user_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.log("Erro ao pegar token:", error);
  }
  return config;
});

export default api;
