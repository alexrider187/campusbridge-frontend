import { createContext } from "react";
import type { AuthContextType } from "../types/auth";

// 🚨 Only context here, no components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
