import { createContext } from "react";
import { signInRequest } from "../services/auth";

type AuthContextType = {
    isAuthenticated : boolean;
}

type SignInData = {
    email: string;
    senha: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({children}) {
    const isAuthenticated = false;

    async function signIn({email, senha} : SignInData){
        const { token, user  } = await signInRequest({
            email,
            senha,
        })
    }

    return(
        <AuthContext.Provider value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}