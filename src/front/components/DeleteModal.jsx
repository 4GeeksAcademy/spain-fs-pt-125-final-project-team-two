import React from "react";
import "./../../front/PostModal.css"; 

function DeleteModal({ show, onClose, onConfirm, loading }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="skillbank-modal" style={{ maxWidth: '400px' }}>
        <div className="modal-header border-0 pb-0">
          <h5 className="modal-title fw-bold text-danger">Eliminar Curso</h5>
          <button type="button" className="btn-close" onClick={onClose} disabled={loading}></button>
        </div>
        <div className="modal-body text-center py-4">
          <i className="fa-solid fa-triangle-exclamation text-warning mb-3" style={{ fontSize: '3rem' }}></i>
          <p className="fs-5 mb-1 fw-semibold text-light">¿Confirma que desea eliminar este curso?</p>
          <p className="text-secondary small mb-0">Esta acción no se puede deshacer.</p>
        </div>
        <div className="modal-footer border-0 pt-0 justify-content-center">
          <button type="button" className="btn btn-ghost" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button type="button" className="btn btn-pill" style={{ backgroundColor: '#dc2626', color: 'white' }} onClick={onConfirm} disabled={loading}>
            {loading ? "Eliminando..." : "Aceptar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;