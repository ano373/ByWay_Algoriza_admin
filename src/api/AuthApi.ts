import { http } from "../lib/http";
import type { LoginRequest, LoginResponse, UserResponse } from "../types/auth";

async function LogIn(payload: LoginRequest): Promise<LoginResponse> {
  const response = await http.post<LoginResponse>("/auth/login", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

async function GetMe(): Promise<UserResponse> {
  const response = await http.get<UserResponse>("/auth/me", {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

export const AuthApi = {
  LogIn,
  GetMe,
};
