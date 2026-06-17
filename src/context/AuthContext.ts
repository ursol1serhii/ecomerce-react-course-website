import { createContext } from "react";

interface AuthContextType {
  signUp: (email: string, password: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  signUp: () => {},
});
