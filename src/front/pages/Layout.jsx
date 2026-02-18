import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProfileForm } from "../components/ProfileForm";
import { API_URL } from "../../config.js";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Layout = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        bio: data.description,      
        avatar_url: data.avatar_url 
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

      const user = await response.json();

      // Guardar usuario en el store global
      dispatch({
        type: "SET_USER",
        payload: user
      });

      // Cerrar modal
      setOpenRegister(false);

      // Redirigir a /feed
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
            <ProfileForm onSubmit={handleRegisterSubmit} />
            <button className="modal-close" onClick={() => setOpenRegister(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      <Outlet />
      <Footer />
    </ScrollToTop>
  );
};
