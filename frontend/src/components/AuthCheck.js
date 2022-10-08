import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthProvider";

const AuthCheck = () => {
    const { auth } = useAuthContext();
    const location = useLocation();

    return (
        auth?.username
            // if they do have a username, allow them to access these routes
            ? <Outlet />
            // if not loggin in
            : auth?.accessToken
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default AuthCheck;