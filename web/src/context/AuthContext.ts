import { createContext } from 'react';

export type AuthContextType = {
    auth: boolean;
    setAuth: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
