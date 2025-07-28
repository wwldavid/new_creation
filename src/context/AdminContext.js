"use client";
import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext({
  isAdmin: false,
  login: async (pw) => false,
  logout: () => {},
});

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") === "true") {
      setIsAdmin(true);
    }
  }, []);

  const login = async (password) => {
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminPw: password }),
    });
    if (res.ok) {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
      return true;
    } else {
      localStorage.removeItem("isAdmin");
      setIsAdmin(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}
