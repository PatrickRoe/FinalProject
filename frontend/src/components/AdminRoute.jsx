// src/components/AdminRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

function AdminRoute({ children }) {
  const { isAdmin } = useContext(AdminContext);

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;
