import React from "react";
import "./../../front/PostModal.css";

function PostModal({ 
  show, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  img, 
  user,
  creditsPerHour 
}) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="skillbank-modal shadow-lg">

        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="modal-body">
          {img && <img src={img} alt={title} className="modal-img" />}

          {/* Usuario */}
          <p className="modal-user">
            <strong>{user}</strong>
          </p>

          {/* Créditos por hora */}
          <p className="modal-credits">
            <strong>{creditsPerHour} créditos</strong>
          </p>

          <p className="modal-description">{description}</p>
        </div>

        <div className="modal-footer mt-1">
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-pill" onClick={onConfirm}>Confirmar</button>
        </div>

      </div>
    </div>
  );
}

export default PostModal;
