import { createContext, useContext } from "react";

const AuthContext = createContext<any | undefined>(undefined);

export function AuthProvider({ children, value }: any) {
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export function useAuthValue() {
    return useContext(AuthContext);
}