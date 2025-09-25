// AuthContext.tsx
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect, type ReactNode } from "react";
import { BASE_API_URL } from "./config/api";

interface DecodedToken {
    username: string;
    role: string;
}

interface Quotes {
    _id: string;
    text: string;
    author?: string;
}

interface AuthContextType {
    username: string | null;
    isAdmin: boolean;
    savedQuotes?: Quotes[];
    logout: () => void;
    unsaveQuote: (quoteId: string) => void;
    saveQuote: (quoteId: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
    username: null,
    isAdmin: false,
    savedQuotes: [],
    logout: () => { },
    unsaveQuote: () => { },
    saveQuote: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [savedQuotes, setSavedQuotes] = useState<Quotes[]>([]);

    const loadSavedQuotes = async () => {
        const token = localStorage.getItem("token");
        if (!token) return [];
        try {
            const data = await axios.get(`${BASE_API_URL}/auth/allSavedQuotes`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(data);
            setSavedQuotes(data.data.savedQuotes || []);
            return data.data.savedQuotes || [];
        } catch {
            return [];
        }
    };

    const saveQuote = async (quoteId: string) => {
        try {
            await axios.post(`${BASE_API_URL}/auth/saveQuote/${quoteId}`, {
                quoteId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            loadSavedQuotes();
            alert("Quote saved successfully");
        } catch (error) {
            alert("Error saving quote");
        }
    }

    const unsaveQuote = async (quoteId: string) => {
        try {
            await axios.delete(`${BASE_API_URL}/auth/removeSavedQuote`, {
                data: { quoteId },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            loadSavedQuotes();
            alert("Quote unsaved successfully");
        } catch (error) {
            alert(`Error unsaving quote ${error}`);
        }
    }

    const loadUser = () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                setUsername(decoded.username);
                setIsAdmin(decoded.role === "admin");
            } catch {
                localStorage.removeItem("token");
                setUsername(null);
                setIsAdmin(false);
            }
        } else {
            setUsername(null);
            setIsAdmin(false);
        }
    };

    useEffect(() => {
        loadUser();
        loadSavedQuotes()
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUsername(null);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ username, isAdmin, logout, savedQuotes, unsaveQuote, saveQuote }}>
            {children}
        </AuthContext.Provider>
    );
};
