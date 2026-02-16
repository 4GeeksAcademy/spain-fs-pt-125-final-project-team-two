import { useState } from "react";
import { ProfileForm } from "../components/ProfileForm";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Profile = () => {
  const { store, dispatch } = useGlobalReducer();
  const [open, setOpen] = useState(false);

  // Datos del usuario desde el store global
  const userData = store.user || {
    name: "Benjamin",
    email: "benjamin@example.com",
    description: "Aqui puedes dejar tu informacion, lo que los usuarios deberian saber de ti.",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const updatedUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      description: formData.get("description"),
    };

    dispatch({
      type: "SET_USER",
      payload: updatedUser,
    });

    setOpen(false);
  };

  return (
    <>
      <div className="profile-page">
        <button className="profile-edit-btn" onClick={() => setOpen(true)}>
          <i className="fa-regular fa-pen-to-square"></i>
        </button>

        <div className="profile-content">
          <img
            src="ruta-de-tu-foto.jpg"
            className="profile-avatar"
            alt="Foto de perfil"
          />

          <h1 className="profile-name">{userData.name}</h1>
          <p className="profile-email">{userData.email}</p>

          <p className="profile-bio">{userData.description}</p>
        </div>
      </div>

      {/* Modal reutilizable */}
      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ProfileForm onSubmit={handleSubmit} user={userData} />
            <button className="modal-close" onClick={() => setOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
