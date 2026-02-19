import { useState } from "react";
import { ProfileForm } from "../components/ProfileForm";
import useGlobalReducer from "../hooks/useGlobalReducer";
import skillbankAvatar from "../assets/img/SkillBank.png";

export const Profile = () => {
  const { store, dispatch } = useGlobalReducer();
  const [open, setOpen] = useState(false);

  const userData = store.user || {
    name: "Usuario",
    email: "email@example.com",
    description: "Aquí puedes escribir tu biografía.",
    avatar_url: "",
    wallet_credits: 0
  };

  const handleSubmit = (updatedUser) => {
    dispatch({
      type: "SET_USER",
      payload: {
        ...store.user,
        ...updatedUser
      }
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
            src={userData.avatar_url || skillbankAvatar}
            className="profile-avatar"
            alt="Foto de perfil"
          />

          <h1 className="profile-name">{userData.name}</h1>
          <p className="profile-email">{userData.email}</p>

          <p className="profile-credits">
            Créditos disponibles: <span>{userData.wallet_credits}</span>
          </p>

          <p className="profile-bio">{userData.description}</p>
        </div>
      </div>

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
