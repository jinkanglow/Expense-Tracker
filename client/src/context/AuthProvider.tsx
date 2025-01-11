import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

interface User {
  id: string;
  username: string;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string>(() => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr).id : '';
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });
  const navigate = useNavigate();

  const login = useCallback(
    (user: User) => {
      setUserId(user.id);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setUserId('');
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  }, [navigate]);

  const value = {
    userId,
    setUserId,
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
