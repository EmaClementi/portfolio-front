import React, { createContext, useState, useContext } from 'react';
import { post } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (e) {
                console.error("Error parsing stored user data", e);
                return null;
            }
        }
        return null;
    });

    const loading = false;

    const login = async (credentials) => {
        try {
            // Adjust endpoint and response handling based on your AuthController
            const response = await post('/auth/login', credentials);
            const userData = {
                token: response.token,
                email: credentials.email,
                id: response.userId // Store the User ID from backend
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', response.token);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

