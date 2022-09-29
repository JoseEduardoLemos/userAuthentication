import { createContext } from "react";

type AuthContextType = {
    isAuthenticated : boolean;
}

export const AuthContext = createContext({});

export function AuthProvider({children}) {
    const isAuthenticated = false;
    return(
        <AuthContext.Provider value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}