import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactModal from "./ContactModal";
import DeleteModal from "./DeleteModal";
import { API_URL } from "../../config.js";
import "./../../front/InfoCard.css";
import defaultCourseImg from "../../front/assets/img/infocard.png";

function InfoCard({ skill, isOwner }) {
  const { id, title, description, image_url, credits_per_hour, user_name } = skill;
  const { store, dispatch } = useGlobalReducer();
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    dispatch({ 
      type: "SET_SELECTED_ACTIVITY", 
      payload: { id, title, description, credits_per_hour } 
    });
    dispatch({ type: "TOGGLE_POST_MODAL" });
  };

  const executeDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${API_URL}/api/skills/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${store.token}` }
      });
      if (response.ok) {
        dispatch({ type: "SET_ACTIVITIES", payload: store.activities.filter(act => act.id !== id) });
        setShowDeleteModal(false);
      }
    } catch (error) { console.error(error); } finally { setIsDeleting(false); }
  };

  return (
    <>
      <div className="skillbank-card shadow-sm text-center position-relative h-100 d-flex flex-column" style={{ border: isOwner ? '1px solid #3b82f6' : '1px solid rgba(148, 163, 184, 0.1)' }}>
        
        {/* Solo mostramos edición/borrado si soy el dueño */}
        {isOwner && (
          <div className="position-absolute" style={{ top: '15px', right: '15px', zIndex: 10, display: 'flex', gap: '8px' }}>
            <button onClick={handleEdit} className="btn btn-sm text-secondary border-0" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button onClick={() => setShowDeleteModal(true)} className="btn btn-sm text-danger border-0" style={{ background: 'rgba(220, 38, 38, 0.1)' }}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        )}

        <div className="pt-4 d-flex justify-content-center">
          <div style={{ width: '100px', height: '100px', overflow: 'hidden', borderRadius: '50%', border: '3px solid #334155', background: '#0f172a' }}>
            <img src={image_url || defaultCourseImg} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        <div className="card-body d-flex flex-column flex-grow-1">
          <p className="text-uppercase fw-bold mb-1" style={{ fontSize: '0.7rem', color: isOwner ? '#3b82f6' : '#94a3b8' }}>{isOwner ? "Tu Curso" : "Curso"}</p>
          <h5 className="card-title fw-bold text-white">{title}</h5>
          <div className="text-start my-3 flex-grow-1">
            <p className="card-text text-light" style={{ fontSize: '0.9rem' }}>{description}</p>
          </div>
          <div className="mt-auto">
            <p className="card-credits mb-3">
              <span className="badge px-3 py-2" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                <i className="fa-solid fa-coins me-2"></i><strong>{credits_per_hour} créditos / h</strong>
              </span>
            </p>
            
            {/* Solo mostramos "Coordinar Clase" si NO soy el dueño */}
            {!isOwner && (
              <button className="btn btn-primary btn-pill w-100 fw-semibold" onClick={() => setShowContactModal(true)}>Coordinar Clase</button>
            )}
            {isOwner && (
              <div className="text-muted small italic">Vista previa de tu curso</div>
            )}
          </div>
        </div>
      </div>
      <ContactModal show={showContactModal} onClose={() => setShowContactModal(false)} title={title} teacherName={user_name} />
      <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={executeDelete} loading={isDeleting} />
    </>
  );
}

export default InfoCard;