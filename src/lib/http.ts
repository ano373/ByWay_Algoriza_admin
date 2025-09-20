import axios from "axios";

export const http = axios.create({
  baseURL: "https://example.com",
  timeout: 10000,
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized, redirect to login");
    }
    return Promise.reject(error);
  }
);
