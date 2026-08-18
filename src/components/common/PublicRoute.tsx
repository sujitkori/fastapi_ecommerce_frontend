import type { ReactNode } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
    children: ReactNode;
}

const PublicRoute = ({children}: PublicRouteProps) => {
    const {isAuthenticated} = useAuth();

    if(isAuthenticated){
        return< Navigate to='/' replace/>
    }
    return children;
}

export default PublicRoute;