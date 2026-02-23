import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactModal from "./ContactModal";
import { API_URL } from "../../config.js";
import "./../../front/InfoCard.css";
import defaultCourseImg from "../../front/assets/img/infocard.png";

function InfoCard({ id, title, shortText, fullText, img, user, updatedAt, creditsPerHour }) {
  const { store, dispatch } = useGlobalReducer();
  const [showContactModal, setShowContactModal] = useState(false);
  const displayImg = img || defaultCourseImg;

  const handleEdit = () => {
    dispatch({ 
      type: "SET_SELECTED_ACTIVITY", 
      payload: { id, title, description: shortText || fullText, credits_per_hour: creditsPerHour } 
    });
    dispatch({ type: "TOGGLE_POST_MODAL" });
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este curso?")) return;

    try {
      const response = await fetch(`${API_URL}/api/skills/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${store.token}` }
      });

      if (response.ok) {
        const filteredActivities = store.activities.filter(act => act.id !== id);
        dispatch({ type: "SET_ACTIVITIES", payload: filteredActivities });
      } else {
        alert("No se pudo eliminar el curso.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="skillbank-card shadow-sm text-center position-relative h-100 d-flex flex-column">
        <div className="position-absolute" style={{ top: '15px', right: '15px', zIndex: 10, display: 'flex', gap: '8px' }}>
          <button onClick={handleEdit} className="btn btn-sm text-secondary border-0" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button onClick={handleDelete} className="btn btn-sm text-danger border-0" style={{ background: 'rgba(220, 38, 38, 0.1)', borderRadius: '8px' }}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>

        <div className="pt-4 d-flex justify-content-center">
          <div style={{ width: '100px', height: '100px', overflow: 'hidden', borderRadius: '50%', border: '3px solid #334155' }}>
            <img src={displayImg} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.src = "https://api.dicebear.com/7.x/identicon/svg?seed=" + title} />
          </div>
        </div>

        <div className="card-body d-flex flex-column flex-grow-1">
          <p className="text-uppercase fw-bold mb-1" style={{ fontSize: '0.7rem', color: '#3b82f6', letterSpacing: '1px' }}>Curso</p>
          <h5 className="card-title fw-bold" style={{ color: '#f8fafc' }}>{title}</h5>
          <div className="text-start my-3 flex-grow-1">
            <p className="mb-1 fw-semibold" style={{ fontSize: '0.85rem', color: '#94a3b8' }}>¿Qué aprenderás?</p>
            <p className="card-text" style={{ color: '#ffffff', fontSize: '0.9rem' }}>{shortText || fullText}</p>
          </div>
          <div className="mt-auto">
            <p className="card-credits mb-3">
              <span className="badge px-3 py-2" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                <strong>{creditsPerHour} créditos / h</strong>
              </span>
            </p>
            <button className="btn btn-primary btn-pill w-100 fw-semibold" onClick={() => setShowContactModal(true)}>Coordinar Clase</button>
            <p className="card-updated mt-3 mb-0" style={{ color: '#64748b', fontSize: '0.7rem' }}>Actualizado {updatedAt}</p>
          </div>
        </div>
      </div>
      <ContactModal show={showContactModal} onClose={() => setShowContactModal(false)} title={title} teacherName={user} />
    </>
  );
}

export default InfoCard;