import { createContext } from "react";
interface User {
  email: string;
  password: string;
}
interface AuthContextType {
  user: User | null;
  signUp: (
    email: string,
    password: string,
  ) => { success: boolean; error?: string };
  logout: () => void;
  login: (
    email: string,
    password: string,
  ) => { success: boolean; error?: string };
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signUp: () => {
    return { success: true };
  },
  logout: () => {},
  login: () => {
    return { success: true };
  },
});
