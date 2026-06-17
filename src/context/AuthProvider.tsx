import { useState } from "react";
import { AuthContext } from "./AuthContext";

interface User {
  email: string;
  password: string;
}

interface ContainerProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: ContainerProps) {
  const [user, setUser] = useState<User | null>(null);
  function signUp(email: string, password: string) {
    // 1. Fetch the data (can be string or null)
    const savedUsers = localStorage.getItem("users");

    // 2. If savedUsers is null, fall back to an empty array string "[]"
    const users: User[] = JSON.parse(savedUsers || "[]");

    // 3. Add the new user
    const newUser = { email, password };
    users.push(newUser);

    // 4. Save back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // 5. Update your React state so the app knows the user is logged in
    setUser(newUser);
  }
  function login() {}

  return (
    <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>
  );
}
