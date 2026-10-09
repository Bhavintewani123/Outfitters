import { createContext, useContext, useState } from "react";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("outfitters_user"));
    } catch {
      return null;
    }
  });

  const request = async (path, body) => {
    const res = await fetch(`${API}/api/auth/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    localStorage.setItem("outfitters_token", data.token);
    localStorage.setItem("outfitters_user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = (email, password) => request("login", { email, password });
  const signup = (name, email, password) =>
    request("signup", { name, email, password });

  const logout = () => {
    localStorage.removeItem("outfitters_token");
    localStorage.removeItem("outfitters_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);