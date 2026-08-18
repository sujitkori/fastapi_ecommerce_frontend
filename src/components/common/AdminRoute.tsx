import type { ReactNode } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { isAuthenticated, user, isProfileLoading } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isProfileLoading) { 
    return  <div>Loading...</div>
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
  
};

export default AdminRoute;
