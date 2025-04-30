import api from "./api";
import { User, LoginFormData, SignupFormData, ApiResponse } from "../types";
import { setToken, removeToken } from "../utils/tokenUtils";

interface AuthResponse {
  user: User;
  token: string;
}

export const login = async (
  data: LoginFormData
): Promise<{ user: User; token: string }> => {
  const response = await api.post<
    AuthResponse,
    { success: boolean; data: AuthResponse; message?: string }
  >("/auth/login", data);
  console.log("first response", response);

  if (response.success && response.data) {
    setToken(response.data.token);
    return response.data;
  }

  throw new Error(response.message || "Login failed");
};

export const signup = async (data: SignupFormData): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>("/auth/register", {
    email: data.email,
    password: data.password,
    userType: data.userType,
  });

  if (response.data.success && response.data) {
    setToken(response.data.data.token);
    return response.data.data;
  }

  throw new Error(response.data.message || "Signup failed");
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<ApiResponse<User>>("/auth/me");

  if (response.data.success && response.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to get user");
};

export const logout = (): void => {
  removeToken();
};
