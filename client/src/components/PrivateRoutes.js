import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  // Check if the user is authenticated, replace this with your authentication logic
  const isAuthenticated = localStorage.getItem("token")?true:false; // Example: Replace with your authentication logic
  
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
