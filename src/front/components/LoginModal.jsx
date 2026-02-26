import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { API_URL } from "../../config.js";
import "../ProfileForm.css";

export const LoginModal = () => {
    const { store, dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    if (!store.isLoginModalOpen) return null;

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await resp.json();

            if (!resp.ok) {
                // Personalización del error si la API devuelve msg genérico
                throw new Error(data.msg || "El email o la contraseña no son válidos.");
            }

            dispatch({
                type: "login_success",
                payload: {
                    token: data.token,
                    user: data.user ?? null
                },
            });
            
            try {
                if (!data.user) {
                    const token = data.token || localStorage.getItem("token");
                    if (token) {
                        const profResp = await fetch(`${API_URL}/api/users/profile`, {
                            headers: {
                                Authorization: "Bearer " + token
                            }
                        });
                        if (profResp.ok) {
                            const profData = await profResp.json();
                            dispatch({ type: "SET_USER", payload: profData });
                        }
                    }
                }
            } catch (e) {
                console.error("No se pudo obtener el perfil tras login:", e);
            }

            dispatch({ type: "TOGGLE_LOGIN_MODAL" });
            navigate("/feed");

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div 
            className="fixed-top w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(15, 23, 42, 0.8)", zIndex: 1050 }}
            onClick={() => dispatch({ type: "TOGGLE_LOGIN_MODAL" })}
        >
            <div
                className="p-4 rounded shadow-lg position-relative"
                style={{
                    backgroundColor: "#1e293b",
                    width: "100%",
                    maxWidth: "420px",
                    border: "1px solid rgba(148, 163, 184, 0.2)"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                    onClick={() => dispatch({ type: "TOGGLE_LOGIN_MODAL" })}
                    aria-label="Close"
                ></button>

                <h2 className="text-center mb-4" style={{ color: "#f8fafc" }}>Bienvenido de nuevo</h2>
                <form className="skillbank-form" onSubmit={handleLogin}>
                    
                    {/* Estilo de error actualizado */}
                    {error && (
                        <div className="form-error text-center text-danger mb-3" style={{ fontSize: "0.9rem", fontWeight: "600" }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <div className="form-field">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="email@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="form-submit mt-3 w-100">
                        Iniciar Sesión
                    </button>

                </form>
            </div>
        </div>
    );
};