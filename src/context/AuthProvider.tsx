import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/axiosInstance";
import { AuthContext } from "./AuthContext";
import type { UserType, AuthState, AuthContextType } from "../types/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
  });

  const navigate = useNavigate();

  // 🔹 On mount, check localStorage for token
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuth({ user: null, token, isLoading: true });
      fetchUser(token);
    } else {
      setAuth({ user: null, token: null, isLoading: false });
    }
  }, []);

  // 🔹 Fetch user profile
  const fetchUser = async (token: string) => {
    try {
      const response = await api.get<UserType>("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAuth({ user: response.data, token, isLoading: false });
    } catch {
      localStorage.removeItem("authToken");
      setAuth({ user: null, token: null, isLoading: false });
    }
  };

  // 🔹 Login
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<{ token: string } & UserType>(
        "/auth/login",
        { email, password }
      );
      const { token, ...user } = response.data;

      localStorage.setItem("authToken", token);
      setAuth({ user, token, isLoading: false });
      navigate("/profile");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Login failed");
      }
      throw new Error("An unknown error occurred");
    }
  };

  // 🔹 Register
  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: "student" | "lecturer"
  ) => {
    try {
      const response = await api.post<{ token: string } & UserType>(
        "/auth/register",
        { firstName, lastName, email, password, role }
      );
      const { token, ...user } = response.data;

      localStorage.setItem("authToken", token);
      setAuth({ user, token, isLoading: false });
      navigate("/profile");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Registration failed");
      }
      throw new Error("An unknown error occurred");
    }
  };

  // 🔹 Update profile
  const updateProfile = async (updates: {
    firstName?: string;
    lastName?: string;
    password?: string;
  }) => {
    if (!auth.token) throw new Error("User not authenticated");

    try {
      const response = await api.put<UserType>(
        "/auth/profile",
        updates,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      setAuth(prev => ({ ...prev, user: response.data }));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Update failed");
      }
      throw new Error("An unknown error occurred");
    }
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("authToken");
    setAuth({ user: null, token: null, isLoading: false });
    navigate("/login");
  };

  const value: AuthContextType = {
    ...auth,
    login,
    logout,
    register,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
