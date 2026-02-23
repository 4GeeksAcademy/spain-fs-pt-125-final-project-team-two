// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "../store";  // Import the reducer and the initial state.

// Create a context to hold the global state of the application
const StoreContext = createContext();

// Provider that wraps the entire app and exposes store + dispatch
export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
            
            fetch(`${backendUrl}/api/users/profile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Token inválido o expirado");
                }
                return response.json();
            })
            .then(userData => {
                dispatch({
                    type: "SET_USER",
                    payload: userData
                });
            })
            .catch(error => {
                console.error("Error recuperando la sesión en la recarga:", error);
                dispatch({ type: "logout" });
            });
        }
    }, []);

    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext);
    return { dispatch, store };
}
