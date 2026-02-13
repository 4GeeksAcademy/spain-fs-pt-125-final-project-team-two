import React from "react";
import { ProfileForm } from "./ProfileForm";

export const ProfileModal = ({ show, onClose, onSubmit }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-custom">
        <div className="modal-header">
          <h5 className="modal-title">Crear perfil</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="modal-body">
          <ProfileForm onSubmit={onSubmit} defaultValues={{}} />
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
