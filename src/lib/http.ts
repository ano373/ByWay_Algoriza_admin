import axios from "axios";
import toast from "react-hot-toast";

export const http = axios.create({
  baseURL: "https://byway-fs132.runasp.net/api",
  timeout: 5000,
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
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
    const url = error.config?.url || "";
    const excludedEndpoints = ["/auth/me"];

    if (excludedEndpoints.some((endpoint) => url === endpoint)) {
      return Promise.reject(error);
    }
    const errors = error.response?.data?.errors;

    if (errors && typeof errors === "object") {
      const errorMessages = Object.values(errors).flat().join("\n");

      toast.error(errorMessages, {
        duration: 6000,
      });
    } else {
      toast.error(error.response?.data?.message || "Server unavailable", {
        id: "server-error",
        duration: 3000,
      });
    }

    return Promise.reject(error);
  }
);
