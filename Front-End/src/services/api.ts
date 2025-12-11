import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "https://tcc4-learnify-rnmobile-fullstack.onrender.com/api";
// http://192.168.1.5:3000

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("user_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
