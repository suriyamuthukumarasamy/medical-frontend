import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ isAuthenticated, allowedRoles = [], role, children }) => {
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/loginIn" replace />;
  }

  // If allowedRoles are defined and user role is not included, redirect
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectRoute;
