import axios, { AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "X-API-KEY": API_KEY,
    "ngrok-skip-browser-warning": true,
  },
});

export const getData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiService.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default apiService;
