import { createContext } from 'react';

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  userId: string;
  setUserId: (userId: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
