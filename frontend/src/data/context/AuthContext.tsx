"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { User } from "../type";



type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (
    user: User,
    token: string
  ) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // LOAD ONCE
  useEffect(() => {
    const storedUser =
  localStorage.getItem("user");

const storedToken =
  localStorage.getItem("token");

if (storedUser) {
  setUser(
    JSON.parse(storedUser)
  );
}

if (storedToken) {
  setToken(storedToken);
}
    setLoading(false);
  }, []);

  // SAVE WHEN USER CHANGES
  useEffect(() => {
   if (user && token) {

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

  localStorage.setItem(
    "token",
    token
  );

} else {
      localStorage.removeItem("user");
    }
  }, [user, token]);

 const login = (
  userData: User,
  authToken: string
) => {
  setUser(userData);
  setToken(authToken);
};

  const logout = () => {

  setUser(null);

  setToken(null);

  localStorage.removeItem("user");

  localStorage.removeItem("token");

};
  return (
    <AuthContext.Provider value={{
  user,
  token,
  login,
  logout,
}}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within AuthProvider");

  return context;
}