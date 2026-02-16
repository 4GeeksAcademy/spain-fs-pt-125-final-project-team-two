import { useState } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProfileForm } from "../components/ProfileForm";

export const Layout = () => {
  const [openRegister, setOpenRegister] = useState(false);

  const handleRegisterSubmit = (data) => {
    console.log("Datos enviados desde el modal:", data);
    setOpenRegister(false);
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
