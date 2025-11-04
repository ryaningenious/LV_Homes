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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postData = async (endpoint: string, obj: any): Promise<any> => {
  try {
    const response: AxiosResponse = await apiService.post(endpoint, obj);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default apiService;
