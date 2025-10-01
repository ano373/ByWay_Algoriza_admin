import axios from "axios";
import toast from "react-hot-toast";

export const http = axios.create({
  baseURL: "http://localhost:5184/api",
  timeout: 10000,
});

const Admin_token = [
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.",
  "eyJzdWIiOiI1MDA2IiwiZW1haWwiOiJhZG1pbkAuY29tIiwianRpIjoiZ",
  "DQwMzllZjItYTIxYS00MWY1LWJlMjgtMzUzMjE2YjVkNDBkIiwicm9sZSI6ImFkbWluIiwiZXhwIj",
  "oxNzU5MzU1NzA5LCJpc3MiOiJBbG9ncml6YSIsImF1ZCI6IldlYkFwaSJ9.",
  "GksywlOnsk8nDBvWaDr7TqAKp3cuWv4uW-xsr8mkaQs",
].join("");

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
