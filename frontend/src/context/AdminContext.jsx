// src/context/AdminContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = async () => {
    try {
      const response = await axios.get('/auth/profile');
      setIsAdmin(response.data.isAdmin);
    } catch (error) {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
