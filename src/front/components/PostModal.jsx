import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { API_URL } from "../../config.js";
import "./../../front/PostModal.css";

function PostModal() {
  const { store, dispatch } = useGlobalReducer();
  
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creditsPerHour, setCreditsPerHour] = useState(1); 
  const [loading, setLoading] = useState(false);

  if (!store.isPostModalOpen) return null;

  const handleClose = () => {
    dispatch({ type: "TOGGLE_POST_MODAL" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${store.token}`
        },
        
        body: JSON.stringify({ 
          title, 
          description, 
          credits_per_hour: parseInt(creditsPerHour),
          category: "education learning" 
        }) 
      });

      if (response.ok) {
        const data = await response.json();
        
        dispatch({
          type: "SET_ACTIVITIES",
          payload: [data.skill, ...store.activities] 
        });

        
        setTitle("");
        setDescription("");
        setCreditsPerHour(1);
        handleClose();
      } else {
        alert("Ocurrió un error al crear el curso. Revisa los datos.");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="skillbank-modal shadow-lg">
        
        <div className="modal-header">
          <h5 className="modal-title fw-bold">Publicar un Nuevo Curso</h5>
          <button type="button" className="btn-close" onClick={handleClose}></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body text-start">
            <div className="mb-3">
              <label htmlFor="courseTitle" className="form-label fw-semibold">Título del curso</label>
              <input 
                type="text" 
                id="courseTitle"
                className="form-control" 
                placeholder="Ej: Introducción a React"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            
            <div className="mb-3">
              <label htmlFor="courseCredits" className="form-label fw-semibold">Créditos por hora</label>
              <input 
                type="number" 
                id="courseCredits"
                className="form-control" 
                placeholder="Ej: 1"
                min="1"
                max="20"
                value={creditsPerHour}
                onChange={(e) => setCreditsPerHour(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="courseDesc" className="form-label fw-semibold">Descripción</label>
              <textarea 
                id="courseDesc"
                className="form-control" 
                rows="4" 
                placeholder="Explica qué van a aprender tus alumnos en este curso..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            
            <p className="text-muted small">
              <i className="fa-solid fa-circle-info"></i> La imagen del curso se generará automáticamente según la temática.
            </p>
          </div>

          <div className="modal-footer mt-1">
            <button type="button" className="btn btn-ghost" onClick={handleClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-pill btn-primary" disabled={loading}>
              {loading ? "Publicando..." : "Confirmar y Publicar"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default PostModal;