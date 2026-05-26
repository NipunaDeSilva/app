import React, { createContext, useContext, useState } from "react";

type User = {
    id: number;
    name: string;
};

type AppContextType = {
    users: User[];
    setUsers: (users: User[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string;
    setError: (error: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({children}: {children: React.ReactNode}){
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    return(
        <AppContext.Provider
        value={{
            users,
            setUsers,
            loading,
            setLoading,
            error,
            setError,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);

    if(!context){
        throw new Error("useAppContext must be used inside AppProvider");

    }

    return context;
}