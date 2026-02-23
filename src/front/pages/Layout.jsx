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
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (data) => {
    try {
      const nameFromEmail = data.email ? data.email.split("@")[0] : "Usuario";
      const payload = {
        email: data.email,
        password: data.password,
        avatar_url: data.avatar_url,
        name: nameFromEmail
      };

      const response = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error("Error al crear usuario");
        return;
      }

      const result = await response.json();
      console.log("RESULTADO DEL SIGNUP:", result);


      const userObject = {
        id: result.user_id,
        email: data.email,
        name: nameFromEmail,
        avatar_url: data.avatar_url,
        wallet_credits: result.credits
      };

      dispatch({
        type: "login_success",
        payload: {
          token: result.token,
          user: userObject
        }
      });

      setOpenRegister(false);
      navigate("/feed");

    } catch (error) {
      console.error("Error en el POST:", error);
    }
  };

  return (
    <ScrollToTop>
      <Navbar onOpenRegister={() => setOpenRegister(true)} />

      {openRegister && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="btn-close position-absolute top-0 start-0 m-3"
              onClick={() => setOpenRegister(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <ProfileForm onSubmit={handleRegisterSubmit} />
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
