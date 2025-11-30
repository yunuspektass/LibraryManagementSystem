import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sayfa yüklendiğinde kullanıcı bilgilerini kontrol et
    const checkAuth = () => {
      if (authAPI.isAuthenticated()) {
        const currentUser = authAPI.getCurrentUser();
        setUser(currentUser);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (usernameOrEmail, password) => {
    try {
      const response = await authAPI.login(usernameOrEmail, password);
      if (response.isSuccess && response.user) {
        setUser(response.user);
        return { success: true, user: response.user };
      }
      return { success: false, message: response.message || 'Giriş başarısız' };
    } catch (error) {
      return { success: false, message: error.message || 'Bir hata oluştu' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      if (response.isSuccess && response.user) {
        setUser(response.user);
        return { success: true, user: response.user };
      }
      return { success: false, message: response.message || 'Kayıt başarısız' };
    } catch (error) {
      return { success: false, message: error.message || 'Bir hata oluştu' };
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

