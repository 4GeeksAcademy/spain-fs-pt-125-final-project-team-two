import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProfileForm } from "../components/ProfileForm";
import { API_URL } from "../../config.js";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { LoginModal } from "../components/LoginModal.jsx";
import PostModal from '../components/PostModal.jsx'

export const Layout = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (data) => {
    setRegisterError("");
    try {
      const response = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          bio: data.description,
          avatar_url: data.avatar_url
        })
      });

      const result = await response.json();

      if (!response.ok) {
        setRegisterError(result.msg || "Error al registrarse");
        return;
      }

      dispatch({
        type: "login_success",
        payload: { token: result.token, user: { id: result.user_id, name: result.name, email: result.email, avatar_url: result.avatar_url, wallet_credits: result.credits } }
      });

      setOpenRegister(false);
      navigate("/feed");
    } catch (error) {
      console.error("Error signup:", error);
      setRegisterError("Error al conectar con el servidor");
    }
  };

  return (
    <ScrollToTop>
      <Navbar onOpenRegister={() => setOpenRegister(true)} />

      {openRegister && (
        <div className="fixed-top w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "rgba(15, 23, 42, 0.8)", zIndex: 1050 }} onClick={() => setOpenRegister(false)}>
          <div className="p-4 rounded shadow-lg position-relative" style={{ backgroundColor: "#1e293b", width: "100%", maxWidth: "420px", border: "1px solid rgba(148, 163, 184, 0.2)" }} onClick={(e) => e.stopPropagation()}>
            <button type="button" className="btn-close btn-close-white position-absolute top-0 end-0 m-3" onClick={() => { setOpenRegister(false); setRegisterError(""); }}>
              ×
            </button>
            <h2 className="text-center mb-4" style={{ color: "#f8fafc" }}>Crear Cuenta</h2>
            <ProfileForm onSubmit={handleRegisterSubmit} isRegister={true} externalError={registerError} />
          </div>
        </div>
      )}

      <Outlet />
      <LoginModal />
      <PostModal />
      <Footer />
    </ScrollToTop>
  );
};