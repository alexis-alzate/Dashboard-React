import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = () => {
      const userData = localStorage.getItem('user_data') || sessionStorage.getItem('user_data');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  const login = async (email, password, remember) => {
    // Simulación de usuarios
    const users = [
      { id: 1, email: 'admin@ejemplo.com', password: 'Admin123!', name: 'Administrador', role: 'admin' },
      { id: 2, email: 'usuario@ejemplo.com', password: 'Usuario123!', name: 'Usuario Demo', role: 'user' }
    ];

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Credenciales inválidas');

    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      token: Math.random().toString(36).substr(2)
    };

    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('user_data', JSON.stringify(userData));
    storage.setItem('auth_token', userData.token);
    
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('user_data');
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('user_data');
    sessionStorage.removeItem('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};