import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth"
import type { ReactNode } from "react";

interface ProtectedRouterProps{
    children: ReactNode;
}

const ProtectedRoute = ({children}:ProtectedRouterProps) => {
        const {isAuthenticated} = useAuth();

        if (!isAuthenticated){
            return <Navigate to="/login" replace/>;
        }

        return children;
}

export default ProtectedRoute;