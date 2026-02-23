import React from "react";
import { ProfileForm } from "./ProfileForm";

export const ProfileModal = ({ show, onClose, onSubmit }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-custom position-relative">
        <button className="btn-close position-absolute top-0 start-0 m-3" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        <div className="modal-header">
          <h5 className="modal-title">Crear perfil</h5>
        </div>

        <div className="modal-body">
          <ProfileForm user={{}} onSubmit={onSubmit} />
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
