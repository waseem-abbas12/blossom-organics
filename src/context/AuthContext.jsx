import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('blossom_admin_auth') === 'true';
  });

  const adminLogin = (email, password) => {
    // Default demo credentials or any configured admin
    if ((email === "admin@blossom.com" && password === "admin123") || 
        (email === "admin" && password === "admin")) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('blossom_admin_auth', 'true');
      return { success: true };
    }
    return { success: false, message: "Invalid email or password. Use admin@blossom.com / admin123" };
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('blossom_admin_auth');
  };

  return (
    <AuthContext.Provider value={{ isAdminLoggedIn, adminLogin, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
