import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { API_URL } from "../../config.js";
import "./../../front/PostModal.css";

function PostModal() {
  const { store, dispatch } = useGlobalReducer();
  const [formData, setFormData] = useState({ title: "", description: "", creditsPerHour: 1 });
  const [loading, setLoading] = useState(false);

  const isEditing = !!store.selectedActivity;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        title: store.selectedActivity.title || "",
        description: store.selectedActivity.description || "",
        creditsPerHour: store.selectedActivity.credits_per_hour || 1
      });
    } else {
      setFormData({ title: "", description: "", creditsPerHour: 1 });
    }
  }, [store.selectedActivity, store.isPostModalOpen]);

  if (!store.isPostModalOpen) return null;

  const handleClose = () => {
    dispatch({ type: "SET_SELECTED_ACTIVITY", payload: null });
    dispatch({ type: "TOGGLE_POST_MODAL" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const randomId = Math.floor(Math.random() * 5000);
    const diceBearUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${randomId}`;

    try {
      const cleanBaseUrl = API_URL.replace(/\/+$/, "");
      const endpoint = isEditing 
        ? `${cleanBaseUrl}/api/skills/${store.selectedActivity.id}`
        : `${cleanBaseUrl}/api/skills`;

      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${store.token}`
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          credits_per_hour: parseInt(formData.creditsPerHour),
          image_url: diceBearUrl, 
          category: "education learning"
        })
      });

      if (!response.ok) throw new Error("Error en servidor");
      const data = await response.json();
      const newSkill = data.skill || data;

      const updatedActivities = isEditing
        ? store.activities.map(act => act.id === store.selectedActivity.id ? newSkill : act)
        : [newSkill, ...store.activities];

      dispatch({ type: "SET_ACTIVITIES", payload: updatedActivities });
      handleClose();

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="skillbank-modal">
        <div className="modal-header">
          <h5 className="modal-title fw-bold">{isEditing ? "Editar mi Curso" : "Publicar Nuevo Curso"}</h5>
          <button type="button" className="btn-close" onClick={handleClose}></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form-container">
          <div className="modal-body text-start">
            <div className="mb-3">
              <label className="form-label fw-semibold">Título</label>
              <input type="text" className="form-control" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required disabled={loading} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Créditos/Hora</label>
              <input type="number" className="form-control" value={formData.creditsPerHour} onChange={(e) => setFormData({...formData, creditsPerHour: e.target.value})} required disabled={loading} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Descripción</label>
              <textarea className="form-control" rows="4" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required disabled={loading} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={handleClose} disabled={loading}>Cancelar</button>
            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
              {loading ? "Procesando..." : (isEditing ? "Confirmar Cambios" : "Confirmar y Publicar")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostModal;