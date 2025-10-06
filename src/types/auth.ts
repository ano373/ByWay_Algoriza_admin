import type { ApiResponse } from "./general";

export type LoginRequest = {
  email?: string;
  userName?: string;
  password: string;
};

type LogIn = {
  userId: number;
  email: string;
  jwtToken: string;
};
export type LoginResponse = ApiResponse<LogIn>;

type User = {
  userId: number;
  email: string;
};
export type UserResponse = ApiResponse<User>;
