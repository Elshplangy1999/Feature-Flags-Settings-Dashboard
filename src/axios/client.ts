import { RequestBody, RequestParams } from "@/types/FetchData/FetchData";
import axios, { Method } from "axios";

// Function to get current language from localStorage
const getCurrentLanguage = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("language") || "en";
  }
  return "en"; // Default fallback for SSR
};

// Create axios instance for JSON Server
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JSON_SERVER_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add language header to all requests
api.interceptors.request.use(async (config) => {
  const currentLang = getCurrentLanguage();
  config.headers["Accept-Language"] = currentLang;
  return config;
});

// Simple fetch function without authentication
export const fetchData = async <T = unknown>(
  body: RequestBody | RequestParams,
  url: string,
  method: Method = "GET",
  returnFullResponse: boolean = false,
): Promise<T> => {
  try {
    const response = await api({
      method,
      url,
      data: method !== "GET" ? body : undefined,
      params: method === "GET" ? body : undefined,
    });

    return returnFullResponse ? (response as unknown as T) : response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default api;
