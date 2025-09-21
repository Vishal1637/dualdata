import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  login as apiLogin, 
  signup as apiSignup, 
  logout as apiLogout,
  onAuthStateChange
} from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const subscription = onAuthStateChange((user) => {
      setUser(user);
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    await apiLogin(email, password);
    // onAuthStateChange will handle setting user and navigating
  };

  const signup = async (name, email, password) => {
    await apiSignup(name, email, password);
    // onAuthStateChange will handle user state. Supabase requires email confirmation.
    // Return true to indicate the process was initiated.
    return true;
  };
  
  const logout = async () => {
    await apiLogout();
    navigate('/login');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
