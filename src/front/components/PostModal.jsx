import React from "react";

function PostModal({ show, onClose, onConfirm, title, description, img, user }) {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">{title || "Título del post"}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {img && (
              <img src={img} alt={title} className="img-fluid mb-3" />
            )}
            {user && <p><strong>{user}</strong></p>}
            <p>{description || "Descripción del contenido...PROBANDO"}</p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={onConfirm}>
              Confirmar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PostModal;
