import { useState } from "react";
import { ProfileForm } from "../components/ProfileForm";
import useGlobalReducer from "../hooks/useGlobalReducer";
import skillbankAvatar from "../assets/img/SkillBank.png";
import { API_URL } from "../../config.js";

export const Profile = () => {
  const { store, dispatch } = useGlobalReducer();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const userData = {
    name: store.user?.name ?? "Usuario",
    email: store.user?.email ?? "email@example.com",
    description: store.user?.description ?? store.user?.bio ?? "Aquí puedes escribir tu biografía.",
    avatar_url: store.user?.avatar_url ?? "",
    wallet_credits: store.user?.wallet_credits ?? 0,
    id: store.user?.id ?? null
  };

  const handleSubmit = async (updatedUser) => {
    setError("");
    setSaving(true);

    try {
      const payload = {
        name: updatedUser.name,
        email: updatedUser.email,
        description: updatedUser.description,
        avatar_url: updatedUser.avatar_url,
      };

      if (updatedUser.password) payload.password = updatedUser.password;

      const token = localStorage.getItem("token");

      const resp = await fetch(`${API_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {})
        },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) {
        let msg = "Error al actualizar el perfil";
        try {
          const errJson = await resp.json();
          if (errJson?.message) msg = errJson.message;
        } catch (e) { }
        throw new Error(msg);
      }

      const data = await resp.json();

      const normalized = {
        ...store.user,
        ...data,
        // garantizar ambos campos para compatibilidad con el Front
        description: data.description ?? data.bio ?? store.user?.description ?? store.user?.bio,
        bio: data.bio ?? data.description ?? store.user?.bio ?? store.user?.description
      };

      dispatch({
        type: "SET_USER",
        payload: normalized
      });

      setOpen(false);
    } catch (err) {
      console.error("Error actualizando usuario:", err);
      setError(err.message || "No se pudo actualizar el perfil");
    } finally {
      setSaving(false);
    }
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
            {error && <p className="form-error">{error}</p>}
            <ProfileForm user={userData} onSubmit={handleSubmit} />
            <button
              className="modal-close"
              onClick={() => setOpen(false)}
              disabled={saving}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
