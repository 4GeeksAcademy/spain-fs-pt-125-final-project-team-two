import { useState } from "react";
import { ProfileForm } from "../components/ProfileForm";
import DeleteModal from "../components/DeleteModal";
import useGlobalReducer from "../hooks/useGlobalReducer";
import skillbankAvatar from "../assets/img/SkillBank.png";
import { API_URL } from "../../config.js";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");


  const userData = {
    name: store.user?.name ?? "Usuario",
    email: store.user?.email ?? "email@example.com",
    description:
      store.user?.description ??
      store.user?.bio ??
      "",
    avatar_url: store.user?.avatar_url || null,
    wallet_credits: store.user?.wallet_credits ?? 0,
    id: store.user?.id ?? null,
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
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
        body: JSON.stringify(updatedUser),
      });

      if (!resp.ok) throw new Error("Error al actualizar");

      const data = await resp.json();

      dispatch({
        type: "SET_USER",
        payload: { ...store.user, ...data },
      });

      setOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProfile = async () => {
    setDeleting(true);

    try {
      const token = localStorage.getItem("token");

      const resp = await fetch(`${API_URL}/api/users/profile`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        }
      });

      if (!resp.ok) throw new Error("Error al eliminar el perfil");

      // Limpiar tokens y usuario del store
      localStorage.removeItem("token");
      dispatch({ type: "logout" });

      // Redirigir a home
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <div className="profile-page">
        <div className="profile-buttons-group">
          <button className="profile-edit-btn" onClick={() => setOpen(true)}>
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          <button
            className="profile-edit-btn"
            onClick={() => setShowDeleteModal(true)}
            title="Eliminar perfil"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>

        <div className="profile-content text-center">
          <img
            src={userData.avatar_url || skillbankAvatar}
            className="profile-avatar mb-3"
            alt="Foto"
          />
          <h1 className="profile-name text-white">{userData.name}</h1>
          <p className="profile-email text-muted">{userData.email}</p>
          <p className="profile-credits">
            Créditos:{" "}
            <span className="text-primary">{userData.wallet_credits}</span>
          </p>
          <p className="profile-bio mt-3 text-light">{userData.description || "Aquí puedes contarnos algo sobre ti"}</p>
        </div>
      </div>

      {open && (
        <div
          className="fixed-top w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            background: "rgba(15, 23, 42, 0.8)",
            zIndex: 1050,
          }}
          onClick={() => setOpen(false)}
        >
          <div
            className="p-4 rounded shadow-lg position-relative"
            style={{
              backgroundColor: "#1e293b",
              width: "100%",
              maxWidth: "420px",
              border: "1px solid rgba(148, 163, 184, 0.2)",
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

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteProfile}
        loading={deleting}
        title="Eliminar Perfil"
        message="¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer y perderás todos tus datos."
      />
    </>
  );
};
