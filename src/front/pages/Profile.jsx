import { useState } from "react";
import { ProfileForm } from "../components/ProfileForm";
import DeleteModal from "../components/DeleteModal";
import InfoCard from "../components/InfoCard";
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
    description: store.user?.description ?? store.user?.bio ?? "",
    avatar_url: store.user?.avatar_url || null,
    wallet_credits: store.user?.wallet_credits ?? 0,
    id: store.user?.id ?? null,
  };

  const mySkills = store.activities.filter(skill => skill.user_id === store.user?.id);

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
      dispatch({ type: "SET_USER", payload: { ...store.user, ...data } });
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
      localStorage.removeItem("token");
      dispatch({ type: "logout" });
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    /* Contenedor que mata el fondo blanco */
    <div className="profile-container-full" style={{ backgroundColor: "#0f172a", minHeight: "100vh", width: "100%" }}>
      <div className="container py-5">
        {/* SECCIÓN ORIGINAL DEL PERFIL */}
        <div className="profile-page mb-5" style={{ backgroundColor: "#1e293b", borderRadius: "16px", padding: "2.5rem", border: "1px solid rgba(148, 163, 184, 0.2)" }}>
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
              style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "3px solid #3b82f6" }}
            />
            <h1 className="profile-name text-white">{userData.name}</h1>
            <p className="profile-email text-muted">{userData.email}</p>
            <p className="profile-credits text-white">
              Créditos:{" "}
              <span className="fw-bold" style={{ color: "#3b82f6" }}>{userData.wallet_credits}</span>
            </p>
            <p className="profile-bio mt-3 text-light" style={{ maxWidth: "600px", margin: "0 auto" }}>
              {userData.description || "Aquí puedes contarnos algo sobre ti"}
            </p>
          </div>
        </div>

        <div className="row g-5">
          {/* TABLA DE TRAZABILIDAD */}
          <div className="col-lg-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-white m-0" style={{ fontSize: "1.2rem" }}>Actividad Reciente</h4>
              <button className="btn btn-primary btn-sm btn-pill" onClick={() => dispatch({ type: "TOGGLE_POST_MODAL" })}>
                + Agregar Habilidad
              </button>
            </div>

            <div className="table-responsive bg-dark p-3 rounded" style={{ backgroundColor: "#1e293b !important", border: "1px solid rgba(148, 163, 184, 0.2)" }}>
              <table className="table table-dark table-borderless table-sm mb-0">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <th className="text-muted fw-normal">Fecha</th>
                    <th className="text-muted fw-normal">Clase Contactada</th>
                  </tr>
                </thead>
                <tbody>
                  {store.contactHistory.length === 0 ? (
                    <tr><td colSpan="2" className="text-center text-muted py-3">Aún no hay historial.</td></tr>
                  ) : (
                    store.contactHistory.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-2">{item.date.split("T")[0]}</td>
                        <td className="py-2" style={{ color: "#3b82f6" }}>{item.skillTitle}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECCIÓN MIS HABILIDADES */}
          <div className="col-lg-8">
            <h2 className="feed-title mb-4 text-white" style={{ borderLeft: "4px solid #3b82f6", paddingLeft: "15px" }}>Mis Habilidades</h2>
            {mySkills.length === 0 ? (
              <p className="text-muted">No has publicado habilidades todavía.</p>
            ) : (
              <div className="row g-4">
                {mySkills.map((skill) => (
                  <div className="col-md-6" key={skill.id}>
                    <InfoCard skill={skill} isOwner={true} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MODAL EDITAR */}
        {open && (
          <div
            className="fixed-top w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(15, 23, 42, 0.9)", zIndex: 1050 }}
            onClick={() => setOpen(false)}
          >
            <div
              className="p-4 rounded shadow-lg position-relative"
              style={{ backgroundColor: "#1e293b", width: "100%", maxWidth: "420px", border: "1px solid rgba(148, 163, 184, 0.2)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                onClick={() => setOpen(false)}
                disabled={saving}
              >
                ×
              </button>
              <h2 className="text-center mb-4 text-white">Editar Perfil</h2>
              {error && <p className="text-danger text-center">{error}</p>}
              <ProfileForm user={userData} onSubmit={handleSubmit} isRegister={false} />
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
      </div>
    </div>
  );
};