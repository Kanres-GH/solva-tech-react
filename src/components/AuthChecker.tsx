import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { Navigate } from 'react-router-dom';

interface AuthCheckerProps {
    children: JSX.Element;
}

const AuthChecker: React.FC<AuthCheckerProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.login.isLoggedOn);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AuthChecker;