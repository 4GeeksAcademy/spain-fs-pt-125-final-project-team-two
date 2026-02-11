import React from "react";
import "./../../front/PostModal.css";

function PostModal({ show, onClose, onConfirm, title, description, img, user }) {
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
          <p className="modal-user"><strong>{user}</strong></p>
          <p className="modal-description">{description}</p>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-pill" onClick={onConfirm}>Confirmar</button>
        </div>

      </div>
    </div>
  );
}

export default PostModal;
