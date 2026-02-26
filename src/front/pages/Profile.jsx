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
    description: store.user?.description ?? store.user?.bio ?? "Aquí puede aparecer tu biografía, háblanos de ti.",
    avatar_url: store.user?.avatar_url ?? "",
    wallet_credits: store.user?.wallet_credits ?? 0,
    id: store.user?.id ?? null
  };

  const handleSubmit = async (updatedUser) => {
    setError("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      const resp = await fetch(`${API_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {})
        },
        body: JSON.stringify(updatedUser)
      });

      if (!resp.ok) throw new Error("Error al actualizar");

      const data = await resp.json();

      dispatch({
        type: "SET_USER",
        payload: { ...store.user, ...data }
      });

      setOpen(false);
    } catch (err) {
      setError(err.message);
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

        <div className="profile-content text-center">
          <img
            src={userData.avatar_url || skillbankAvatar}
            className="profile-avatar mb-3"
            alt="Foto"
          />
          <h1 className="profile-name text-white">{userData.name}</h1>
          <p className="profile-email text-muted">{userData.email}</p>
          <p className="profile-credits">
            Créditos: <span className="text-primary">{userData.wallet_credits}</span>
          </p>
          <p className="profile-bio mt-3 text-light">{userData.description}</p>
        </div>
      </div>

      {open && (
        <div
          className="fixed-top w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(15, 23, 42, 0.8)", zIndex: 1050 }}
          onClick={() => setOpen(false)}
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
              type="button"
              className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
              onClick={() => setOpen(false)}
              disabled={saving}
            ></button>

            <h2 className="text-center mb-4 text-white">Editar Perfil</h2>

            {error && <p className="text-danger text-center">{error}</p>}

            <ProfileForm
              user={userData}
              onSubmit={handleSubmit}
              isRegister={false}
            />
          </div>
        </div>
      )}
    </>
  );
};
