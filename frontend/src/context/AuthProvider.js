import { createContext, useContext, useState } from "react";

/* when a component that subscribes to this context,
 * it will read the current context value from closest
 * Provider above it in tree */ 
const AuthContext = createContext({});

/* this is the consumer
 * abstract it using useContext hook */
const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    // this is the data we want to share between components
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(localStorage.getItem("persist") || false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, useAuthContext, AuthProvider};