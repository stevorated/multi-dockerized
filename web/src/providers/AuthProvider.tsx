import React, { FunctionComponent } from 'react';
import { AuthContext } from '../context';

export const AuthProvider: FunctionComponent = ({ children }) => {
    const [auth, setAuth] = React.useState(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
