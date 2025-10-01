import axios from "axios";
import toast from "react-hot-toast";

export const http = axios.create({
  baseURL: "http://localhost:5184/api",
  timeout: 10000,
});

const Admin_token = import.meta.env.VITE_ADMIN_TOKEN;

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken") || Admin_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => {
    if (["post", "put", "delete"].includes(response.config.method || "")) {
      toast.success(response.data?.value.message || "Success!");
    }
    return response;
  },
  (error) => {
    const errors = error.response?.data?.errors;

    if (errors && typeof errors === "object") {
      const errorMessages = Object.values(errors).flat().join("\n");

      toast.error(errorMessages, {
        duration: 6000,
      });
    } else {
      toast.error(error.response?.data?.message || "An error occurred");
    }

    return Promise.reject(error);
  }
);
