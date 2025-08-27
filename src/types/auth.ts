// 🔹 Represents a logged-in user
export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

// 🔹 Auth state stored in context
export type AuthState = {
  user: UserType | null;
  token: string | null;
  isLoading: boolean;
};

// 🔹 What AuthContext provides
export type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: "student" | "lecturer"
  ) => Promise<void>;
   updateProfile: (updates: {
    firstName?: string;
    lastName?: string;
    password?: string;
  }) => Promise<void>;
  logout: () => void;
};
