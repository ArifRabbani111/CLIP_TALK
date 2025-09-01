import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { signIn, signUp, googleSignIn } from '../services/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('profile', JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('profile');
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
      dispatch({ type: 'LOGIN', payload: profile });
    }
  }, []);

  const login = async (formData) => {
    try {
      const { data } = await signIn(formData);
      dispatch({ type: 'LOGIN', payload: data });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (formData) => {
    try {
      const { data } = await signUp(formData);
      dispatch({ type: 'LOGIN', payload: data });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const googleAuth = async (accessToken) => {
    try {
      const { data } = await googleSignIn(accessToken);
      dispatch({ type: 'LOGIN', payload: data });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, googleAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);