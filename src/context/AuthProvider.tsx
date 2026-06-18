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
  const [user, setUser] = useState<User | null>(() => {
    const saveUser = localStorage.getItem("currentUser");
    return saveUser ? JSON.parse(saveUser) : null;
  });
  function signUp(email: string, password: string) {
    // 1. Fetch the data (can be string or null)
    const savedUsers = localStorage.getItem("users");

    // 2. If savedUsers is null, fall back to an empty array string "[]"
    const users: User[] = JSON.parse(savedUsers || "[]");

    // 3. Add the new user
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already exists" };
    }
    const newUser = { email, password };
    users.push(newUser);

    // 4. Save back to localStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    // 5. Update your React state so the app knows the user is logged in
    setUser(newUser);

    return { success: true };
  }
  function login(email: string, password: string) {
    const savedUsers = localStorage.getItem("users");

    // 2. If savedUsers is null, fall back to an empty array string "[]"
    const users: User[] = JSON.parse(savedUsers || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      return { success: false, error: "Invalid password or email" };
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    setUser(user);
    return { success: true };
  }
  function logout() {
    localStorage.removeItem("currentUser");
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{ user, signUp, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}
