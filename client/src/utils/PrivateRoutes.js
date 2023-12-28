import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  // Check if the user has a valid token (you can replace this with your own logic)
  const isAuthenticated = localStorage.getItem('token') !== null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
