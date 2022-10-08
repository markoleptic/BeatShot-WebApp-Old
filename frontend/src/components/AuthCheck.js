import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

const AuthCheck = () => {
    const { auth } = useAuthContext();
    const location = useLocation();

    return (
        // if they do have a username and access token
        auth?.username && auth?.accessToken
            // allow them to access these routes
            ? <Outlet />
            // otherwise redirect to login page
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default AuthCheck;